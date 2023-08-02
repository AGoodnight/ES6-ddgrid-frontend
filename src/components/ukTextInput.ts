import { ReplaySubject } from "rxjs";

export type UKTextEvent = Event & {
  target: Event["currentTarget"] & {
    value: string;
  };
};

export type UKDefaultValues = {
  value: string;
  placeholer: string;
};

export type UKTextInputProps = {
  defaults?: UKDefaultValues;
  element: HTMLInputElement;
  onChange?: (value: string) => void;
};

class UkTextInput {
  value$ = new ReplaySubject<string>(1);
  private _defaults: UKDefaultValues = { value: "", placeholer: "" };
  private _element: HTMLInputElement | undefined = undefined;

  constructor({ defaults, element, onChange }: UKTextInputProps) {
    const localVal = this.localValue(element.id);
    const value = defaults?.value || this._defaults.value;
    const placeholer = defaults?.placeholer || this._defaults.placeholer;
    this._defaults = { value, placeholer };

    const currentValue = localVal || this._defaults?.value;

    if (currentValue?.length > 0) {
      this.value$.next(currentValue);
    }

    if (!element) {
      console.error("No HTMLInputElement was provided to UKInput");
      return;
    }

    element.addEventListener("change", (event: Event) => {
      console.log(event);

      const thisEvent = event as UKTextEvent;
      if (!thisEvent.target?.value) {
        console.error("No value was select on UKSelect");
        return;
      }
      this.value$.next(thisEvent.target.value);
      onChange?.(thisEvent.target.value);
    });

    this._element = element;
  }

  localValue = (key: string): string | undefined => {
    const localVal: string | null = localStorage.getItem(key);
    if (!localVal) {
      return undefined;
    }
    return localVal;
  };
}

export default UkTextInput;
