import { ReplaySubject } from "rxjs";

export type UKSelectEvent = Event & {
  target: Event["currentTarget"] & {
    value: string;
  };
};

export type UKOption = {
  value: string;
  name: string;
  preSelect?: boolean;
};

export type UKSelectProps = {
  options: UKOption[];
  element: HTMLSelectElement;
  onSelect?: (selected: UKOption) => void;
};

class UKSelect {
  selected$ = new ReplaySubject<UKOption>(1);
  private _options: UKOption[] = [];
  private _element: HTMLSelectElement | undefined = undefined;

  constructor({ options, element, onSelect }: UKSelectProps) {
    const localVal = this.localValue(element.id);
    const defaultVal = options.find((option: UKOption) => {
      return option.preSelect;
    });
    this._options = options;
    const preSelected = localVal ? localVal : defaultVal;
    if (preSelected) {
      this.selected$.next(preSelected);
    }

    if (!element) {
      console.error("No HTMLSelectElement was provided to UKSelect");
      return;
    }

    if (!options) {
      console.error("No UKOptions were provided to UKSelect");
      return;
    }

    options.forEach((option: UKOption) => {
      const optObject = new Option();
      optObject.value = option.value;
      optObject.innerHTML = option.name;
      optObject.selected = option.preSelect ?? false;
      element.add(optObject);
    });

    element.addEventListener("change", (event: Event) => {
      console.log(event);

      const thisEvent = event as UKSelectEvent;
      if (!thisEvent.target?.value) {
        console.error("No value was select on UKSelect");
        return;
      }
      const valueAsProvidedOption = this.getSelectedOption(
        thisEvent.target.value
      );
      if (!valueAsProvidedOption) {
        console.error(
          "The selected value does not match any provided options for UKSelect"
        );
        return;
      }
      this.selected$.next(valueAsProvidedOption);
      onSelect?.(valueAsProvidedOption);
    });

    this._element = element;
  }

  getSelectedOption = (value: string): UKOption | undefined => {
    console.log(value);
    console.log(this._options);
    return this._options.find((option: UKOption) => option.value === value);
  };

  localValue = (key: string): UKOption | undefined => {
    const localVal = localStorage.getItem(key);
    if (!localVal) {
      return undefined;
    }
    return JSON.parse(localVal) as UKOption;
  };
}

export default UKSelect;
