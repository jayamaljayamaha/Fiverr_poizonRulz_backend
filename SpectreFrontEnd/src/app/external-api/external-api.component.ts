import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import  {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-external-api',
  templateUrl: './external-api.component.html',
  styleUrls: ['./external-api.component.css']
})
export class ExternalApiComponent implements OnInit {
  responseJson: string;

  constructor(private api: ApiService, private http: HttpClient) { }


  ngOnInit() {
  }

  postImage() {
    
  }

  pingApi() {
    this.api.ping$().subscribe(
      res => this.responseJson = res
    );
  }

  selectedFile : File = null;

  onFileSelected(event){
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(){
    console.log("uploading");
    const fd = new FormData();
    fd.append('Testing', this.selectedFile, this.selectedFile.name);
    this.http.post('https://us-central1-royalspectreproject.cloudfunctions.net/uploadFile', fd ).subscribe( res =>{
       console.log("Uploaded finished"); 
       console.log(res);
    })

  }

}