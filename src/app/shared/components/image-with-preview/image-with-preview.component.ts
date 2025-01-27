import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'image-with-preview',
  standalone : false,
  templateUrl: './image-with-preview.component.html',
  styleUrls: ['./image-with-preview.component.scss']
})
export class ImageWithPreviewComponent implements OnInit {
  @Input() imgText = ''
  @Input() browseText = ''
  @Input() width = '9rem'
  @Input() height = '9rem'
  @Output() imageChange = new EventEmitter<any>();
  @Output() deleteImage = new EventEmitter<any>();
  selectedFile?: File;
  isDragging: boolean = false;
  imagePreview!: string;
  constructor() { }

  ngOnInit(): void {
  }


  onFileSelected(event: any): void {
   this.selectedFile = event.target.files[0];
    this.previewImage(this.selectedFile);
    this.imageChange.emit(this.selectedFile)
  }
  onDragOver(event: any): void {
    event.preventDefault();
    this.isDragging = true;
    event.dataTransfer.dropEffect = 'copy';
  }

  onDragLeave(event: any): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: any): void {
    event.preventDefault();
    this.isDragging = false;
    this.selectedFile = event.dataTransfer.files[0];
    this.imageChange.emit(event)
    this.previewImage(this.selectedFile);
  }

  previewImage(file?: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    if(file) reader.readAsDataURL(file);
  }

  onDeleteImage(){
    this.selectedFile = undefined
    this.imagePreview = ''
    this.deleteImage.emit(null)
  }

}
