import { Pipe, PipeTransform } from "@angular/core";

// necessário o decorator @Pipe para que o Angular entenda que se trata de um pipe, já que, lá no app.module, ele deve ser declarado no campo 'declarations', conjuntamente com os componentes
@Pipe({
  name: 'reducedDescription'
})
export class ReducedDescription implements PipeTransform {
  transform(fullText: string, cutPosition: number): string {
    if (fullText.length > cutPosition) return `${ fullText.substring(0, cutPosition) }...`
    return fullText
  }
}
