import {
  Injectable,
  Injector,
  runInInjectionContext,
  inject,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom, forkJoin, Observable } from 'rxjs';
import { Properties } from './properties.interface';
import { User } from './user.interface';
import { take, map } from 'rxjs/operators';
import { SessionManagement } from './session-management.service';
import { UserProfile } from './userProfile.interface';

@Injectable({ providedIn: 'root' })
export class FirebaseManagement {
  constructor(
    private firestore: AngularFirestore,
    private injector: Injector,
    private auth: AngularFireAuth
  ) {}

  private sessionManagement = inject(SessionManagement);

  getPriceRange(): Observable<string[]> {
    return new Observable((observer) => {
      runInInjectionContext(this.injector, () => {
        this.firestore
          .collection('properties')
          .valueChanges()
          .subscribe((docs: any[]) => {
            const uniqueValues = [
              ...new Set(docs.flatMap((doc) => doc['propertyPrice']).flat()),
            ];
            observer.next(uniqueValues);
          });
      });
    });
  }

  getUniqueFieldValues2(
    filters: string[]
  ): Observable<{ [key: string]: string[] }> {
    return new Observable((observer) => {
      runInInjectionContext(this.injector, () => {
        const fieldObservables = filters.map((filter) =>
          this.firestore
            .collection('properties', (ref) =>
              ref.where('propertyAvailability', '==', 'Rent')
            )
            .valueChanges()
            .pipe(
              take(1),
              map((docs: any[]) => {
                const uniqueValues = [
                  ...new Set(docs.flatMap((doc) => doc[filter] || []).flat()),
                ];
                return { [filter]: uniqueValues };
              })
            )
        );

        forkJoin(fieldObservables).subscribe(
          (results: { [key: string]: string[] }[]) => {
            const uniqueValuesDictionary: { [key: string]: string[] } = {};

            results.forEach((result) => {
              const filterKey = Object.keys(result)[0]; // Get the filter key
              uniqueValuesDictionary[filterKey] = result[filterKey]; // Assign the unique values to the dictionary
            });

            observer.next(uniqueValuesDictionary);
            observer.complete();
          }
        );
      });
    });
  }

  getProperties(availability: string) {
    return new Promise<Properties[]>((resolve, reject) => {
      runInInjectionContext(this.injector, async () => {
        try {
          const collection = this.firestore.collection<Properties>(
            'properties',
            (ref) => ref.where('propertyAvailability', '==', availability)
          );
          const data = await firstValueFrom(collection.valueChanges());
          const propertiesData: Properties[] = data as Properties[];
          resolve(propertiesData);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  loginWithEmailPassword(email: string, password: string) {
    try {
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          if (user) {
            const username = await this.findUserByUsername(user.email!);
            this.sessionManagement.createSession(
              await this.createUserProfile(username)
            );
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  createUserProfile(user: User) {
    const userProfile: UserProfile = {
      name: user.name,
      surname: user.surname,
      username: user.username,
      profilePicture: user.profilePicture,
      email: user.email,
    };

    return userProfile;
  }

  findUserByUsername(email: string) {
    return new Promise<User>((resolve, reject) => {
      runInInjectionContext(this.injector, async () => {
        try {
          const collection = this.firestore.collection<User>(
            'userProfiles',
            (ref) => ref.where('email', '==', email)
          );
          const data = await firstValueFrom(
            collection.valueChanges().pipe(take(1))
          );
          const user: User = data[0];
          resolve(user);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  async createProfile(username: string, password: string) {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(
        username,
        password
      );
      const user = userCredential.user;
      if (user) {
        await this.addRowToDatabase(username);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addRowToDatabase(email: string) {
    const newUser: User = {
      name: '',
      surname: '',
      username: '',
      address: '',
      phoneNumber: '',
      profilePicture: '/assets/profilePictures/noProfilePicture.png',
      city: '',
      county: '',
      email: email,
    };
    runInInjectionContext(this.injector, async () => {
      try {
        await this.firestore.collection('userProfiles').doc().set(newUser);
        const userProfile = this.createUserProfile(newUser);
        this.sessionManagement.createSession(userProfile);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async filterProperties(userFilters: { [key: string]: string[] }) {
    return new Promise<Properties[]>((resolve, reject) => {
      runInInjectionContext(this.injector, async () => {
        try {
          let propertiesData: Properties[] = [];
          const promisses: Promise<Properties[]>[] = [];
          for (const key of Object.keys(userFilters)) {
            for (const value of userFilters[key]) {
              const collection = this.firestore.collection<Properties>(
                'properties',
                (ref) =>
                  ref
                    .where(key, '==', value)
                    .where('propertyAvailability', '==', 'Rent')
              );
              promisses.push(firstValueFrom(collection.valueChanges()));
            }
            const results = await Promise.all(promisses);
            results.forEach((data) => {
              propertiesData = propertiesData.concat(data);
            });
            const filteredProperties = propertiesData.filter((property) => {
              return Object.keys(userFilters).every((key) => {
                if (userFilters[key].length > 0) {
                  return userFilters[key].includes(
                    property[key as keyof Properties]
                  );
                }
                return true;
              });
            });
            resolve(filteredProperties);
          }
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}
