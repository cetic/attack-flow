import { AppCommand } from "../AppCommand";
import { ApplicationStore } from "@/store/StoreTypes";
import { Browser } from "@/assets/scripts/Browser";
import { PageImage } from "@/assets/scripts/BlockDiagram/PageImage";
import { PageEditor } from "@/store/PageEditor";
import { DiagramObjectModel } from "@/assets/scripts/BlockDiagram";

export class SaveSelectionImageToDevice extends AppCommand {

    /**
     * The page's editor.
     */
    private _editor: PageEditor;

    /**
     * The objects to capture. 
     */
    private _objects: DiagramObjectModel[]


    /**
     * Saves a page's selection as an image to the user's file system.
     * @param context
     *  The application context.
     * @param id
     *  The id of the page.
     */
    constructor(context: ApplicationStore, id: string) {
        super(context);
        let editor = context.pages.get(id);
        if(!editor) {
            throw new Error(`Page '${ id }' not found.`);
        } else {
            this._editor = editor;
        }
        this._objects = [...editor.page.getSubtree(o => o.isSelected())];
    }


    /**
     * Executes the command.
     */
    public execute(): void {
        let d = this._context.settings.view.diagram;         
        let e = this._context.settings.file.image_export;
        let image = new PageImage(
            this._editor.page,
            e.padding,
            d.display_grid,
            d.display_shadows,
            d.display_debug_mode
        );
        Browser.downloadImageFile(
            this._editor.page.props.toString(),
            image.capture(this._objects)
        );
    }

}
