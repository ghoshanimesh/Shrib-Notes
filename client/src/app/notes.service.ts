import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Notes} from './notes';


@Injectable({
  providedIn: 'root'
})
export class NotesService {
  
  constructor(private http: HttpClient) { }

  getNotesBasedOnURL(url_id){
    return this.http.get('http://localhost:3000/note/'+url_id)
  }

  addNote(url_id, text){
    return this.http.post("http://localhost:3000/addnote/"+url_id, {"text": text})
  }

  updateNote(url_id, text){
    return this.http.put("http://localhost:3000/updatenote/"+url_id, {"text": text})
  }

  deleteNote(url_id){
    return this.http.delete("http://localhost:3000/deletenote/"+url_id)
  }

  getRecentNotes(){
    return this.http.get("http://localhost:3000/recentnotes")
  }
}
