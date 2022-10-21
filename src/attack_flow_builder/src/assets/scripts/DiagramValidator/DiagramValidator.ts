import { ValidationErrorResult } from "./ValidationErrorResult";
import {
    DiagramObjectModel,
    GraphObjectExport,
    Template
} from "../BlockDiagram";

export class DiagramValidator {

    /**
     * The validator's error list.
     */
    private _errors: ValidationErrorResult[];


    /**
     * Creates a new {@link DiagramValidator}.
     */
    constructor() {
        this._errors = [];
    }


    /**
     * Resets and runs the validator.
     * @param object
     *  The diagram object to validate.
     */
    public run(object: DiagramObjectModel) {
        this.reset();
        this.validate(object);
    }

    /**
     * Validates a diagram.
     * @param diagram
     *  The diagram to validate.
     */
    protected validate(diagram: DiagramObjectModel) {}

    /**
     * Returns the validator's current set of errors.
     * @returns
     *  The validator's current set of errors.
     */
    public getErrors(): ValidationErrorResult[] {
        return this._errors;
    }

    /**
     * Adds an error to the validator.
     * @param object
     *  The object that failed to validate.
     * @param reason
     *  The reason the object failed to validate.
     */
    protected addError(object: GraphObjectExport, reason: string) {
        this._errors.push({
            object: object.id,
            reason
        })
    }

    /**
     * Tests if the validator is in a valid state.
     * @returns
     *  True if the validator is in a valid state, false otherwise.
     */
    public inValidState(): boolean {
        return this._errors.length === 0;
    }

    /**
     * Resets the validator's state.
     */
    public reset() {
        this._errors = [];
    }

}
