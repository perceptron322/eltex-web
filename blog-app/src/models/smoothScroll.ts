import { ElementRef } from "@angular/core";

export function smoothScrollIntoView(getRef: () => ElementRef | undefined): void {                                                             
    setTimeout(() => {                                                                                                                       
        getRef()?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });                                                        
    }, 0);
} 