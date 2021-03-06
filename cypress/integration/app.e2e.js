/// <reference types="Cypress" />

describe('aurelia-combo', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('responds to {ctrl}f', () => {
    cy.get('#logs');
    cy.get('body').type('{ctrl}f');
    cy.get('#logs > div').should(divs => {
      expect(divs).to.have.length(1);
      expect(divs).to.have.text('findIt');
    });
  });

  it('responds to {ctrl}f when in input', () => {
    cy.get('input[type="text"]').focus();
    cy.get('input[type="text"]').type('{ctrl}f');
    cy.get('#logs > div').should(divs => {
      expect(divs).to.have.length(1);
      expect(divs).to.have.text('findIt');
    });
  });

  it('responds to {ctrl}f when in textarea', () => {
    cy.get('textarea').focus();
    cy.get('textarea').type('{ctrl}f');
    cy.get('#logs > div').should(divs => {
      expect(divs).to.have.length(1);
      expect(divs).to.have.text('findIt');
    });
  });

  it('responds to {ctrl}f when in select', () => {
    cy.get('select').focus();
    cy.get('select').type('{ctrl}f');
    cy.get('#logs > div').should(divs => {
      expect(divs).to.have.length(1);
      expect(divs).to.have.text('findIt');
    });
  });

  it('responds to {ctrl}c', () => {
    cy.get('#logs');
    cy.get('body').type('{ctrl}c');
    cy.get('#logs > div').should(divs => {
      expect(divs).to.have.length(1);
      expect(divs).to.have.text('copyIt');
    });
  });

  it('responds to {ctrl}c when in input', () => {
    cy.get('input[type="text"]').focus();
    cy.get('input[type="text"]').type('{ctrl}c');
    cy.get('#logs > div').should(divs => {
      expect(divs).to.have.length(1);
      expect(divs).to.have.text('copyIt');
    });
  });

  it('responds to {ctrl}c when in textarea', () => {
    cy.get('textarea').focus();
    cy.get('textarea').type('{ctrl}c');
    cy.get('#logs > div').should(divs => {
      expect(divs).to.have.length(1);
      expect(divs).to.have.text('copyIt');
    });
  });

  it('responds to {ctrl}c when in select', () => {
    cy.get('select').focus();
    cy.get('select').type('{ctrl}c');
    cy.get('#logs > div').should(divs => {
      expect(divs).to.have.length(1);
      expect(divs).to.have.text('copyIt');
    });
  });

  it('responds to e', () => {
    cy.get('#logs');
    cy.get('body').type('e');
    cy.get('#logs > div').should(divs => {
      expect(divs).to.have.length(1);
      expect(divs).to.have.text('editIt');
    });
  });

  it('does not respond to e when in input', () => {
    cy.get('input[type="text"]').focus();
    cy.get('input[type="text"]').type('e');
    cy.get('#logs > div').should('have.length', 0);
  });

  it('does not respond to e when in textarea', () => {
    cy.get('textarea').focus();
    cy.get('textarea').type('e');
    cy.get('#logs > div').should('have.length', 0);
  });

  it('does not respond to e when in select', () => {
    cy.get('select').focus();
    cy.get('select').type('e');
    cy.get('#logs > div').should('have.length', 0);
  });

  it('responds to {ctrl}x', () => {
    cy.get('#logs');
    cy.get('body').type('{ctrl}x');
    cy.get('#logs > div').should(divs => {
      expect(divs).to.have.length(1);
      expect(divs).to.have.text('cutIt');
    });
  });

  it('does not respond to e when in input', () => {
    cy.get('input[type="text"]').focus();
    cy.get('input[type="text"]').type('{ctrl}x');
    cy.get('#logs > div').should('have.length', 0);
  });

  it('does not respond to e when in textarea', () => {
    cy.get('textarea').focus();
    cy.get('textarea').type('{ctrl}x');
    cy.get('#logs > div').should('have.length', 0);
  });

  it('does not respond to e when in select', () => {
    cy.get('select').focus();
    cy.get('select').type('e');
    cy.get('#logs > div').should('have.length', 0);
  });

  it('responds to global space key', () => {
    cy.get('#logs');
    cy.get('body').type(' ');
    cy.get('#logs > div').should(divs => {
      expect(divs).to.have.length(1);
      expect(divs).to.have.text('globalSpace');
    });
  });

  it('responds to global enter key', () => {
    cy.get('#logs');
    cy.get('body').type('{enter}');
    cy.get('#logs > div').should(divs => {
      expect(divs).to.have.length(1);
      expect(divs).to.have.text('globalEnter');
    });
  });

  it('responds to entry key when in input', () => {
    cy.get('#logs');
    cy.get('input[type="text"]').focus();
    cy.get('input[type="text"]').type('{enter}');
    cy.get('#logs > div').should(divs => {
      expect(divs).to.have.length(1);
      expect(divs).to.have.text('globalEnter');
    });
  });

  it('does not respond to space key on focused button', () => {
    cy.get('#btn').first().focus().type(' ');
    cy.get('#logs > div').should(divs => {
      // TODO: cannot figure out how to simulate the browser default
      // click through keyboard events.
      expect(divs).to.have.length(0);
      // In real usage, following are expected:
      // expect(divs).to.have.length(1);
      // expect(divs).to.have.text('clickOnButton');
    });
  });

  it('does not respond to enter key on focused button', () => {
    cy.get('#btn').first().focus().type('{enter}');
    cy.get('#logs > div').should(divs => {
      // TODO: cannot figure out how to simulate the browser default
      // click through keyboard events.
      expect(divs).to.have.length(0);
      // In real usage, following are expected:
      // expect(divs).to.have.length(1);
      // expect(divs).to.have.text('clickOnButton');
    });
  });

  it('responds to q', () => {
    cy.get('#logs');
    cy.get('body').type('q');
    cy.get('#logs > div').should(divs => {
      expect(divs).to.have.length(1);
      expect(divs).to.have.text('app q');
    });

    // turn on child node <foo>
    cy.get('input[type="checkbox"]').check().blur();
    cy.get('body').type('q');
    cy.get('#logs > div').should(divs => {
      expect(divs).to.have.length(3);
      expect(divs[0]).to.have.text('app q');
      expect(divs[1]).to.have.text('app q');
      expect(divs[2]).to.have.text('foo q');
    });

    // turn off child node <foo>
    cy.get('input[type="checkbox"]').uncheck().blur();
    cy.get('body').type('q');
    cy.get('#logs > div').should(divs => {
      expect(divs).to.have.length(4);
      expect(divs[0]).to.have.text('app q');
      expect(divs[1]).to.have.text('app q');
      expect(divs[2]).to.have.text('foo q');
      expect(divs[3]).to.have.text('app q');
    });
  });
});
