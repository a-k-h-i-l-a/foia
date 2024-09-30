import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        AppComponent, // Import standalone component here
        MatSelectModule,
        MatOptionModule
    ],
    providers: [],
})
export class AppModule { }
