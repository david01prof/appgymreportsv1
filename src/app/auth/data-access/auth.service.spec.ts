import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

export const mockAuth = {
  // Agrega aquí los métodos o propiedades necesarias para las pruebas
  signInWithEmailAndPassword: jest.fn(),
  currentUser: null,
};

export const mockFirestore = {
  collection: jest.fn(() => ({
    valueChanges: jest.fn(() => []),
    add: jest.fn(() => Promise.resolve()),
  })),
};

describe('AuthService', () => {
  let service: AuthService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        AuthService,
        { provide: Auth, useValue: mockAuth },
        { provide: Firestore, useValue: mockFirestore },
      ],
    });

    service = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('deberia hacer login correctamente', async () => {
    const user = { email: 'user@example.com', password: 'password123' };
    //given

    const mockSignInWithEmailAndPassword = jest.fn().mockResolvedValue({
      user: { uid: '12345' },
    });

    service.signIn = mockSignInWithEmailAndPassword;
    //when
    service.signIn(user).subscribe((response) => {
      expect(response).toEqual({ uid: '12345' });
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        user.email,
        user.password
      );
    });

    // Execute pending HTTP requests (if applicable)
    await httpTesting
      .expectOne((req) => {
        // Assert expectations on the HTTP request (if necessary)
        return req.method === 'POST' && req.url === '/api/login'; // Adjust URL as needed
      })
      .flush({ uid: '12345' }); // Mock the expected response
  });

  /*it('should throw an error on failed login', async () => {
    const user = { email: 'user@example.com', password: 'wrongpassword' };

    // Simula un error de Firebase
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

    await expect(service.signIn(user)).rejects.toThrow(
      'Authentication failed'
    );
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      mockAuth,
      user.email,
      user.password
    );
  });*/
});
