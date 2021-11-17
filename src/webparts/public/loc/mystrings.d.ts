declare interface IPublicWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'PublicWebPartStrings' {
  const strings: IPublicWebPartStrings;
  export = strings;
}
