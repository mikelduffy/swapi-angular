import { SwapiAngularPage } from './app.po';

describe('swapi-angular App', () => {
  let page: SwapiAngularPage;

  beforeEach(() => {
    page = new SwapiAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
