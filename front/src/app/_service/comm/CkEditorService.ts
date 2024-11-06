import { HttpHeaders } from "@angular/common/http";
import { HeadersUtil } from "src/app/_util/headers-util";
import { environment } from "src/environments/environment";
//ckeditorExComponent class Ends here and MyUploadAdapter class begins here in the same ckeditorEx.ts
export class MyUploadAdapter {
  xhr: any;
  loader: any;

  private result: string | null = null;

  getResult(): string | null {
    return this.result;
  }
  constructor(loader: any) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file: any) =>
        new Promise((resolve, reject) => {
          this._initRequest();
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
        })
    );
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Initializes the XMLHttpRequest object using the URL passed to the constructor.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    // Note that your request may look different. It is up to you and your editor
    // integration to choose the right communication channel. This example uses
    // a POST request with JSON as a data structure but your configuration
    // could be different.
    //Replace below url with your API url
    // let api = environment.backApiUrl + `/admin/sys0201/add/cover`
    let api = environment.backApiUrl + `/ckeditor/upload`;

    //  xhr.open('POST', 'https://www.example.com/api/articles/CkEditorUploads', true);
    xhr.open("POST", api, true);
    xhr.responseType = "json";
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve: any, reject: any, file: any) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const response = xhr.response;

      // This example assumes the XHR server's "response" object will come with
      // an "error" which has its own "message" that can be passed to reject()
      // in the upload promise.
      //
      // Your integration may handle upload errors in a different way so make sure
      // it is done properly. The reject() function must be called when the upload fails.
      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText
        );
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      // This URL will be used to display the image in the content. Learn more in the
      // UploadAdapter#upload documentation.

      resolve({
        // default: response.url,
        default: response.message,
      });
    });

    // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
    // properties which are used e.g. to display the upload progress bar in the editor
    // user interface.
    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt: any) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.
  _sendRequest(file: any) {
    // Prepare the form data.
    const data = new FormData();

    // data.append('upload', file);
    data.append("file", file);
    // data.append('bookCode', 'IAAN');

    // Thiết lập các headers
    const headers: HttpHeaders = HeadersUtil.getHeadersAuthCover();

    headers.keys().forEach((key) => {
      const values = headers.getAll(key);
      if (values) {
        values.forEach((value) => {
          this.xhr.setRequestHeader(key, value);
        });
      }
    }); // Important note: This is the right place to implement security mechanisms
    // like authentication and CSRF protection. For instance, you can use
    // XMLHttpRequest.setRequestHeader() to set the request headers containing
    // the CSRF token generated earlier by your application.

    // Send the requestI.
    this.xhr.send(data);
  }
}
