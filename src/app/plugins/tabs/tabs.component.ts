import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements AfterContentInit {
  @Input()
  wrap: boolean = false;
  @ContentChildren(TabComponent)
  tabs: QueryList<TabComponent>;
  @ViewChild('tabsContent', { read: ElementRef })
  tabsContent: ElementRef<any>;
  @ViewChildren('tabContent', { read: ElementRef })
  tabContent: QueryList<any>;

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter(tab => tab.active);
    if (!activeTabs.length) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs.toArray().map(tab => (tab.active = false));
    tab.active = true;
  }

  setFocus(index: number) {
    this.tabsContent.nativeElement.scrollTo({
      left: this.getPosition(index),
      behavior: 'smooth',
    });
  }

  getPosition(index) {
    let width = 0;
    const tabWidth = this.tabContent.toArray();
    for (let i = 0; i < index; i++) {
      width += tabWidth[i].nativeElement.clientWidth;
    }
    return width;
  }

  hideAngle() {
    return (
      this.tabsContent.nativeElement.scrollWidth >
      this.tabsContent.nativeElement.clientWidth
    );
  }

  scrollLeft(): void {
    this.tabsContent.nativeElement.scrollTo({
      left: this.tabsContent.nativeElement.scrollLeft - 250,
      behavior: 'smooth',
    });
  }

  scrollRight(): void {
    this.tabsContent.nativeElement.scrollTo({
      left: this.tabsContent.nativeElement.scrollLeft + 250,
      behavior: 'smooth',
    });
  }
}
