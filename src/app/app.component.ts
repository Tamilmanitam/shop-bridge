import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Electronics {
  name: string;
  model: string;
  price: number;
  specs: string;
  weight: number;
  country: string
}

const ELEMENT_DATA: Electronics[] = [
  { name: "Apple", model: 'Model 1', price: 50000, specs: 'A14 Bionic chip, the fastest chip ever in a smartphone', weight: 200, country: "USA" },
  { name: "Apple", model: 'Model 2', price: 60000, specs: 'A14 Bionic chip, the fastest chip ever in a smartphone', weight: 200, country: "USA" },
  { name: "Apple", model: 'Model 3', price: 70000, specs: 'A14 Bionic chip, the fastest chip ever in a smartphone', weight: 200, country: "USA" },
  { name: "Apple", model: 'Model 4', price: 80000, specs: 'A14 Bionic chip, the fastest chip ever in a smartphone', weight: 200, country: "USA" },
  { name: "Apple", model: 'Model 5', price: 90000, specs: 'A14 Bionic chip, the fastest chip ever in a smartphone', weight: 200, country: "USA" },
  { name: "Apple", model: 'Model 6', price: 100000, specs: 'A14 Bionic chip, the fastest chip ever in a smartphone', weight: 200, country: "USA" },
  { name: "Apple", model: 'Model 7', price: 110000, specs: 'A14 Bionic chip, the fastest chip ever in a smartphone', weight: 200, country: "USA" },
  { name: "Apple", model: 'Model 1', price: 50000, specs: 'A14 Bionic chip, the fastest chip ever in a smartphone', weight: 200, country: "USA" },
  { name: "Apple", model: 'Model 2', price: 60000, specs: 'A14 Bionic chip, the fastest chip ever in a smartphone', weight: 200, country: "USA" },
  { name: "Apple", model: 'Model 3', price: 70000, specs: 'A14 Bionic chip, the fastest chip ever in a smartphone', weight: 200, country: "USA" },
  { name: "Apple", model: 'Model 4', price: 80000, specs: 'A14 Bionic chip, the fastest chip ever in a smartphone', weight: 200, country: "USA" },
  { name: "Apple", model: 'Model 5', price: 90000, specs: 'A14 Bionic chip, the fastest chip ever in a smartphone', weight: 200, country: "USA" },
  { name: "Apple", model: 'Model 6', price: 100000, specs: 'A14 Bionic chip, the fastest chip ever in a smartphone', weight: 200, country: "USA" },
  { name: "Apple", model: 'Model 7', price: 110000, specs: 'A14 Bionic chip, the fastest chip ever in a smartphone', weight: 200, country: "USA" },
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shop-bridge';
  showList: boolean = true
  createItem: boolean = true
  name = new FormControl('', [Validators.required]);
  model = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);
  weight = new FormControl('', [Validators.required]);
  country: any = new FormControl('', [Validators.required]);
  specs = new FormControl('', [Validators.required]);
  displayedColumns: string[] = ['name', 'model', 'price', 'specs', 'weight', 'country', 'action'];
  dataSource = new MatTableDataSource<Electronics>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  submitForm() {
    if (this.name.value == "" || this.model.value == "" || this.price.value == "" || this.specs.value == "" || this.weight.value == "" || (this.country.value == "" && this.country.value != undefined)) {
      this._snackBar.open("Please enter missing values", "Error", {
        duration: 2000,
      });
    } else {
      this.showList = true
      ELEMENT_DATA.push({ name: this.name.value, model: this.model.value, price: this.price.value, specs: this.specs.value, weight: this.weight.value, country: this.country })
    }
  }

  editRow(data) {
    if (data) {
      this.name.setValue(data.name);
      this.model.setValue(data.model);
      this.price.setValue(data.price);
      this.specs.setValue(data.specs);
      this.weight.setValue(data.weight);
      this.country = data.country;
    }
  }

  addNewItem() {
    this.name.setValue("");
    this.model.setValue("");
    this.price.setValue("");
    this.specs.setValue("");
    this.weight.setValue("");
    this.country = "";
  }

  deleteRow(data) {
    ELEMENT_DATA.splice(this.dataSource.filteredData.indexOf(data), 1)
    this.dataSource.data = this.dataSource.data;
  }

  backToList() {
    this.showList = true
  }
}


