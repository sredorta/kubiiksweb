import { AngularEditorConfig } from '../components/angular_editor/config';

export class KiiEditor {

    constructor() {}

    public static config() {
        let editorConfig: AngularEditorConfig = {
            editable: true,
            spellcheck: true,
            height: 'auto',
            minHeight: '0',
            maxHeight: 'auto',
            width: 'auto',
            minWidth: '0',
            translate: 'yes',
            enableToolbar: true,
            showToolbar: true,
            placeholder: 'Enter text here...',
            defaultParagraphSeparator: '',
            defaultFontName: '',
            defaultFontSize: '',
            customClasses: [
            {
                name: 'quote',
                class: 'quote',
            },
            {
                name: 'redText',
                class: 'redText'
            },
            {
                name: 'titleText',
                class: 'titleText',
                tag: 'h1',
            },
            ],
            uploadUrl: 'v1/image',
            sanitize: true,
            toolbarPosition: 'bottom',
            toolbarHiddenButtons: [
            ['bold', 'italic'],
            ['fontSize']
            ]
        };
        return editorConfig;
    }
}