import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, MatTableModule, MatPaginatorModule, MatSelectModule, MatOptionModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'foia';
  pageIndex: number = 0;
  pageSize: number = 10;
  pageLength: number = 0;
  displayedColumns: string[] = ['title', 'website', 'address', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  isDrawerOpen: boolean = false;
  agency: any;
  relationships: any[] = []; // Array to hold agency relationships

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private apiUrl = 'https://api.foia.gov/api/agency_components';
  private apiKey = 'xb3IkVrdbwfCvt60BJZFutdBkhMyWtl8lvT3wUlg';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getAgencies();
  }

  //getAgency details
  getAgencies() {
    const limit = 50;
    const offset = this.pageIndex * this.pageSize;
    const headers = new HttpHeaders({
      'X-API-Key': this.apiKey,
    });
    const url = `${this.apiUrl}?&fields[agency_component]=title,abbreviation,website,submission_address&page[limit]=${limit}&page[offset]=${offset}`;
    this.http.get(url, { headers }).subscribe((data: any) => {
      this.dataSource.data = data.data.slice(0, this.pageSize);
      // console.log(data.data.length)
      this.pageLength = data.data.length;
    });
  }


  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.getNext(event); // Call getNext when the page changes
    });
  }

  getNext(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAgencies();
  }

  goToDetails(agencyId: string) {
    console.log(agencyId)
    this.getAgencyDetails(agencyId)
    this.isDrawerOpen = true;
  }

  closeProfile() {
    this.isDrawerOpen = false;
    // this.selectedCharacter = null;
  }

  getAgencyDetails(agencyId: string | null) {
    if (agencyId) {
      const url = `${this.apiUrl}/${agencyId}`; // Adjust this URL as needed
      this.http.get(url, { headers: { 'X-API-Key': this.apiKey } }).subscribe((data: any) => {
        this.agency = data; // Set the agency data
        // console.log(this.agency)
        this.getAgencyRelationships(data.links.self.href); // Fetch relationships
      });
    }
  }

  //get Relationship details
  getAgencyRelationships(href: string) {
    this.http.get(href, { headers: { 'X-API-Key': this.apiKey } }).subscribe((data: any) => {
      this.relationships = data.data.relationships; //here relationship agency,fio mis and officers data getting null from api
      // console.log(this.relationships)
    })
  }

}
