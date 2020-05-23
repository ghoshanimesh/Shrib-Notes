import { Component, OnInit } from '@angular/core';
import FroalaEditor from 'froala-editor';
import {NotesService} from '../notes.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(private notesService: NotesService, private route: ActivatedRoute, private toastr: ToastrService) { 
    this.url_id_exists = false;
    this.toastrObj = toastr;
  }

  public toastrObj;

  public url_id = this.route.snapshot.paramMap.get('id')

  public url_id_exists: boolean;

  public id: string = ''

  recentNotesLinks = []
  
  public editorContent: string = ''

  public options: Object = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
    heightMin: 250,
    heightMax: 365,
    tabSpaces: 4,
    fontFamily: {
      "Courier Prime, monospace": 'Courier Prime'
    },
    fontFamilySelection: true,
    toolbarButtons: {
      moreText: {
        buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript'],
        align: 'left',
        buttonsVisible: 3
      },
      moreParagraph: {
        buttons: ['outdent', 'indent'],
        align: 'left',
        buttonsVisible: 3
      },
      moreRich: {
        buttons: ['clearFormatting', 'insertHR'],
        align: 'left',
        buttonsVisible: 3
      },
      moreMisc: {
        buttons: ['save', 'undo', 'redo', 'selectAll'],
        align: 'right',
        buttonsVisible: 3
      }
    }
  }

  ngOnInit(): void {
    let self = this;
    console.log(this.url_id)
    this.notesService.getNotesBasedOnURL(this.url_id).subscribe((data: any[])=>{
      this.editorContent = data["text"];
      if(data){
        this.url_id_exists = true;
      }
      console.log(this.editorContent + " " + this.url_id_exists)
    })

    this.notesService.getRecentNotes().subscribe((data: any[])=> {
      this.recentNotesLinks = data;
      console.log(this.recentNotesLinks)
    })

    FroalaEditor.DefineIconTemplate('fontawesome', '<i class="fas icon-size-fa fa-[NAME]"></i>');
    FroalaEditor.DefineIcon('save', {NAME: 'save', template: 'fontawesome'});
    FroalaEditor.RegisterCommand('save', {
      title: 'Save this note to Cloud',
      focus: false,
      undo: false,
      refreshAfterCallback: true,
      callback: function () {
        this.editorContent = this.html.get()
        console.log(this.editorContent)
        console.log(self.url_id_exists)
        if(self.url_id_exists){
          if(this.editorContent != ""){
            //Update the note
            self.notesService.updateNote(self.url_id, this.editorContent).subscribe((data: any[])=>{
              console.log(data)
            });
          }else{
            //delete the note
            self.notesService.deleteNote(self.url_id).subscribe((data: any[])=>{
              console.log(data)
            });            
          }
        }else{
          //Add the new note to db
          console.log(self.url_id)
          self.notesService.addNote(self.url_id, this.editorContent).subscribe((data: any[])=>{
            console.log(data)
          })          
        }
      }
    });
  }

}
