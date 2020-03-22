import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  Type,
  ViewContainerRef
} from '@angular/core';

export interface ComponentReference {
  metadata: Component;
  resolvedCompFactory: ComponentFactory<any>;
  componentType: Type<any>;
  componentName: string;
}


@Component({
  template: '<ng-content></ng-content>',
  selector: 'm-renderer'
})
export class RendererComponent implements OnDestroy, OnInit, AfterViewChecked, OnChanges {

  @Input()
  name: string;

  @Input()
  path: string;

  @Input()
  bindings: Map<string, any>;

  protected currentComponent: ComponentRef<any>;
  protected initRenderInProgress = false;


  constructor(public viewContainer: ViewContainerRef,
              public factoryResolver: ComponentFactoryResolver,
              public cd: ChangeDetectorRef) {

    this.bindings = new Map<string, any>();
  }

  ngOnInit(): void {

    this.initRenderInProgress = true;

    this.viewContainer.clear();
    this.doRenderComponent();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.name && (changes.name.currentValue !== changes.name.previousValue)) {
      this.viewContainer.clear();
      this.doRenderComponent();
    }
  }


  ngAfterViewChecked(): void {
    this.initRenderInProgress = false;
  }


  protected doRenderComponent(): void {
    const reference = this.componentReference();
    this.currentComponent = this.viewContainer.createComponent(reference.resolvedCompFactory);
  }


  protected resolveComponentType(): any {
    const type = this.doLoadType(this.name, this.path);
    console.log('type: ', type);
    return type;
  }

  private async doLoadType(name: string, path: string) {
    const m = await import(/* webpackIgnore: true */ path);
    return m[name];
  }


  protected componentReference(): ComponentReference {
    const currType = this.resolveComponentType();
    const componentFactory: ComponentFactory<any> = this.factoryResolver.resolveComponentFactory(currType);

    const componentMeta: Component = this.resolveDirective(componentFactory);
    const compReference: ComponentReference = {
      metadata: componentMeta,
      resolvedCompFactory: componentFactory,
      componentType: currType,
      componentName: this.name
    };
    return compReference;
  }

  protected resolveDirective(compFactory: ComponentFactory<any>): Component {
    const compMeta: Component = {
      inputs: [],
      outputs: []
    };
    compFactory?.inputs.forEach((input: { propName: string, templateName: string }) => {
      compMeta.inputs.push(input.propName);
    });

    compFactory?.outputs.forEach((output: { propName: string, templateName: string }) => {
      compMeta.outputs.push(output.propName);
    });
    return compMeta;
  }


  ngOnDestroy(): void {
    if (this.currentComponent) {
      this.currentComponent.destroy();
      this.currentComponent = undefined;
    }

    if (this.viewContainer) {
      this.viewContainer.clear();
    }

  }
}
