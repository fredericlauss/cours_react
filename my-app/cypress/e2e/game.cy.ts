/// <reference types="cypress" />

describe('Game Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })


  it('should test hero purchase flow', () => {
    // Vérifie l'argent initial
    cy.get('.money-display')
      .should('contain', '0')

    // Essaie d'acheter un héros (devrait être désactivé)
    cy.get('.factory-button')
      .first()
      .should('be.disabled')

    // Clique sur le héros existant plusieurs fois
    for(let i = 0; i < 50; i++) {
      cy.get('[data-testid="hero-button"]').click()
    }

    // Vérifie que nous avons de l'argent
    cy.get('.money-display')
      .should('not.contain', ' 0 ')

    // Maintenant on devrait pouvoir acheter un héros
    cy.get('.factory-button')
      .first()
      .should('not.be.disabled')
      .click()

    // Vérifie qu'un nouveau héros est apparu
    cy.get('[data-testid="hero-unit"]')
      .should('have.length.at.least', 2)
  })
})