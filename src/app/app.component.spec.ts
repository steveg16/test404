import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { HttpModule, XHRBackend } from '@angular/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MockBackend } from '@angular/http/testing';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        DataService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));

  it('should throw for HttpErrorResponse (404)', inject([DataService, XHRBackend], (service: DataService, mockBackend: MockBackend) => {
    const statusText = 'file not found';
    const statusCode = 404;
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new HttpErrorResponse({ status: statusCode, statusText: statusText }));
    });
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app.err).toEqual(`${statusText} (${statusCode})`);
  }));

  it('should not throw for HttpResponse', inject([DataService, XHRBackend], (service: DataService, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new HttpResponse({ status: 200 }));
    });
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app.data).toBeDefined();
    expect(app.err).not.toBeDefined();
  }));
});
