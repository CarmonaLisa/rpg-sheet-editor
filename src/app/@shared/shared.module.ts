import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HasRoleDirective, IsAuthDirective } from './directives';

const COMPONENTS = [

];

const DIRECTIVES = [
  HasRoleDirective,
  IsAuthDirective
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class SharedModule { }
