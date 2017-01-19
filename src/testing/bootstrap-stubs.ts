import { Directive, Input } from '@angular/core';

@Directive({ selector: '[collapse]' })
export class CollapseStubDirective {
  @Input('collapse') isCollapsed: boolean;
}

@Directive({ selector: '[dropdown]' })
export class DropdownStubDirective { }

@Directive({ selector: '[dropdownToggle]' })
export class DropdownToggleStubDirective { }

@Directive({ selector: '[dropdownMenu]' })
export class DropdownMenuStubDirective { }
