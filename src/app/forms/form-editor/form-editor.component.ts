import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

import Quill from "quill";
import { QuillEditorComponent } from "ngx-quill";

// override p with div tag
const Parchment = Quill.import("parchment");
const Block = Parchment.query("block");

Block.tagName = "DIV";
// or class NewBlock extends Block {}; NewBlock.tagName = 'DIV';
Quill.register(Block /* or NewBlock */, true);

// Add fonts to whitelist
const Font = Quill.import("formats/font");
Font.whitelist = ["sans-serif", "monospace", "serif"];
Quill.register(Font, true);

@Component({
  selector: "app-form-editor",
  templateUrl: "./form-editor.component.html",
  styleUrls: ["./form-editor.component.scss"]
})
export class FormEditorComponent implements OnInit {
  placeholder = "placeholder";
  form: FormGroup;
  hide;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      editor: ["test"]
    });
  }

  @ViewChild("editor", { static: true })
  editor: QuillEditorComponent;

  setControl() {
    this.form.setControl("editor", new FormControl("test - new Control"));
  }

  setFocus($event) {
    $event.focus();
  }

  patchValue() {
    this.form.controls.editor.patchValue(
      `${this.form.controls.editor.value} patched!`
    );
  }

  logChange($event: any) {
  }

  logSelection($event: any) {
  }

  ngOnInit() {
    this.form.controls.editor.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(data => {
        //console.log("native fromControl value changes with debounce", data);
      });

    this.editor.onContentChanged
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(data => {
        //console.log("view child + directly subscription", data);
      });
  }
}
