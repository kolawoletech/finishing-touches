
// Vendor modules
import { NgModule }      from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule,EditorModule,SharedModule} from 'primeng/primeng';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap';
import 'hammerjs'

// App Routing
import { AppRouting,AppRoutingComponents } from './app.routing';
import { AuthGuard } from './global/_guards/index';

// Project Modules
import { AdminModule } from './admin/admin.module';
import { GlobalModule } from './global/global.module';
import { TestModule } from './test/test.module';

// Components
import { AppComponent }  from './app.component';
import { NavBarComponent }  from './core/nav-bar/nav-bar.component';

// Global Services
import { AlertService,AuthenticationService,Logger,UserService,UtilService, ConsignmentService, ConfigService } from './global/_services/index';

// Environment
import { environment } from '../environments/environment';


// Concatenate Components here for readability
export const CoreComponents: Array<any> = [NavBarComponent];
export const PrimeModules: Array<any> = [CalendarModule,EditorModule,GlobalModule];


@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgbModule.forRoot()
    ,PrimeModules
    ,AppRouting
    ,AdminModule
    ,GlobalModule
    ,TestModule
    ,BootstrapModalModule
    ,PaginationModule.forRoot()
  ],
  declarations: [
    AppComponent,
    CoreComponents,
    AppRoutingComponents,
    NgTableComponent,
    NgTableFilteringDirective,
    NgTablePagingDirective,
    NgTableSortingDirective,
  ],
  
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    Logger,
    UserService,
    UtilService,
    ConsignmentService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
