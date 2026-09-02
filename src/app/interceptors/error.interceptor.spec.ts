import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { errorInterceptor } from './error.interceptor';

describe('errorInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should pass through successful request', () => {
    http.get('/api/games').subscribe((res) => expect(res).toEqual([]));
    const req = httpMock.expectOne('/api/games');
    req.flush([]);
  });

  it('should transform network error (status 0)', (done) => {
    http.get('/api/games').subscribe({
      error: (err: Error) => {
        expect(err.message).toContain('Network error');
        done();
      },
    });
    const req = httpMock.expectOne('/api/games');
    req.error(new ProgressEvent('error'), { status: 0, statusText: 'Unknown Error' });
  });

  it('should transform http error 404', (done) => {
    http.get('/api/games').subscribe({
      error: (err: Error) => {
        expect(err.message).toContain('404');
        done();
      },
    });
    const req = httpMock.expectOne('/api/games');
    req.flush('Not found', { status: 404, statusText: 'Not Found' });
  });
});
