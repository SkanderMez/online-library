import { Component, OnInit } from '@angular/core';
import {UserService} from '../../_services/user.service';
import {NotifierService} from 'angular-notifier';

interface DataItem {
  username: string;
  id: number;
  updatedDate: string;
  creationDate: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(
    private userService: UserService,
    private notifierService: NotifierService) { }

  users = [];
  searchValue = '';
  visible = false;
  sortName: string | null = null;
  sortValue: string | null = null;
  listOfFilterAddress = [{ text: 'London', value: 'London' }, { text: 'Sidney', value: 'Sidney' }];
  listOfSearchAddress: string[] = [];
  listOfDisplayData;

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    this.search();
  }

  filterAddressChange(value: string[]): void {
    this.listOfSearchAddress = value;
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.users.filter((item: DataItem) => item.username.indexOf(this.searchValue) !== -1);
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (users: any) => {
        this.users = users;
        this.listOfDisplayData = [...this.users];
        console.log(users);
      }, (error) => {
        console.log(error);
      }, () => {
    }
    );
  }
  ngOnInit() {
    this.getAllUsers();

  }

  deleteRow(id: number) {
    console.log(id);
    this.userService.deleteUser(id).subscribe(
      (data: any) => {
        console.log(data);
      }, (error) => {
        console.log(error);
        this.notifierService.show({
          type: 'error',
          message: 'Error on deleting user.',
        });
      }, () => {
        this.getAllUsers();
        this.notifierService.show({
          type: 'success',
          message: 'User has been deleted successfully.',
        });
      }
    );
  }
}
