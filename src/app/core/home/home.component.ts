import { Component, OnInit } from '@angular/core';
import { UserService, ConsignmentService } from '../../global/_services/index';
import { User } from "../../global/_models/user.model";
import { Consignment } from "../../global/_models/consignment.model";
@Component({
	moduleId: module.id,
	templateUrl: 'home.component.html'
	, styleUrls: ['home.component.less']
	
})
export class HomeComponent implements OnInit {
	public page: Number = 1;
	public itemsPerPage: Number = 10;
	public maxSize: Number = 5;
	public numPages: Number = 1;
	public length: Number = 0;
	public rows: Array<any> = [];
	public columns: Array<any> = [
		{ title: 'Date Invoiced', name: 'column_1' },
		{ title: 'Date Recived', name: 'column_2' },
		{ title: 'Consolidation #', name: 'column_3' },
		{ title: 'Consignment ID', name: 'column_4' },
		{ title: 'Consignment #', name: 'ccolumn_5' },
        { title: 'Invoice #', name: 'column_6' },
        { title: 'Amount Excl. Vat', name: 'column_7' },
	];
	public consignments: Array<any>;
	public config: any = {
		paging: true,
		sorting: { columns: this.columns },
		filtering: { filterString: '' },
		className: ['table-striped', , 'table-bordered']
	};
	currentUser$: any;
	currentUser: User = { email: '' };
	constructor(private userService: UserService, private consignmentService: ConsignmentService) { }


	public ngOnInit(): void {
		this.userService.currentUser.subscribe((data: any) => {
			this.currentUser = data;
		});

		this.loadAllConsignment();

	}

  private loadAllConsignment() {
        this.consignmentService.getAllConsignment()
             .subscribe(consignments => {
                this.consignments = consignments;
                if (this.consignments.length === 0) {
                    this.length = 0;
                }else {
                    this.length = this.consignments.length;
                }
                this.onChangeTable(this.config);
            });
    }
   
    // this is the whole structrure of the table that change by(sorting , filtering)
    public onChangeTable(config: any, page: any = {page:  this.page, itemsPerPage:  this.itemsPerPage}) : any {
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }
        const filteredData = this.changeFilter(this.consignments, this.config);
        const sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) :  sortedData;
        this.length = sortedData.length;
    }

    public changePage(page: any, data: Array<any> = this.consignments):  Array<any> {
        const start = (page.page - 1) * page.itemsPerPage;
        const end = page.itemsPerPage > -1 ? (start  +  page.itemsPerPage) : data.length;
        return data.slice(start, end);
    }

    // this is the filter that filter the data in the table
    public changeFilter(data: any, config: any): any {
        let filteredData: Array<any> = data;
        this.columns.forEach((column: any) => {
            if (column.filtering) {
                filteredData = filteredData.filter((item: any) => {
                    return item[column.name].match(column.filtering.filterString);
                });
            }
        });
        if (!config.filtering) {
            return filteredData;
        }

        if (config.filtering.columnName) {
            return filteredData.filter((item: any) => {
                item[config.filtering.columnName].match(this.config.filtering.filterString)
            });
        }
        const tempArray: Array<any> = [];
        filteredData.forEach((item: any) => {
            let flag = false;
            this.columns.forEach((column: any) => {
                if (item[column.name] != null){
                    if (item[column.name].toString().match(this.config.filtering.filterString)) {
                        flag = true;
                    }
                    if (column.name === 'name') {
                        if (item[column.name].toLowerCase().toString().match(this.config.filtering.filterString)) {
                            flag = true;
                        }
                    }
                }else{
                    item[column.name] = '--------------';
                    flag = true;
                }
            });
            if (flag) {
                tempArray.push(item);
            }
        });
        filteredData = tempArray;
        return filteredData;
    }

    // this is the sort the change the data table
    public changeSort(data: any, config: any): any {
        if (!config.sorting) {
            return data;
        }
        const columns = this.config.sorting.columns || [];
        let columnName: string = void 0;
        let sort: string = void 0;
        for (let i = 0; i < columns.length; i++ ) {
            if (columns[i].sort !== '' && columns[i].sort !== false) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }
        if (!columnName) {
            return data;
        }
        // simple sorting
        return data.sort((previous: any, current: any) => {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 :  1;
            } else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 :  1;
            }
            return 0;
        });
  } 
}
