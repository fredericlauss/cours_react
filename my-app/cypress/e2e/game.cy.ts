describe('Game Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173') // Ajuste l'URL selon ton environnement
  })

  it('should verify CGU flow', () => {
    // Ouvre les CGU
    cy.get('[data-testid="cgu-button"]').click()
    
    // Vérifie le contenu des CGU
    cy.get('[data-testid="cgu-content"]')
      .should('be.visible')
      .and('contain', 'Conditions Générales d\'Utilisation')
  })

  it('should test hero purchase flow', () => {
    // Vérifie l'argent initial
    cy.get('[data-testid="money-display"]').should('contain', '0')

    // Essaie d'acheter un héros (devrait être désactivé)
    cy.get('[data-testid="buy-hero-button"]')
      .should('be.disabled')

    // Clique sur le héros existant plusieurs fois
    cy.get('[data-testid="hero-button"]').as('heroButton')
    
    // Clique 10 fois
    for(let i = 0; i < 10; i++) {
      cy.get('@heroButton').click()
    }

    // Vérifie que nous avons assez d'argent
    cy.get('[data-testid="money-display"]')
      .should('not.contain', '0')

    // Maintenant on devrait pouvoir acheter un héros
    cy.get('[data-testid="buy-hero-button"]')
      .should('not.be.disabled')
      .click()

    // Vérifie qu'un nouveau héros est apparu
    cy.get('[data-testid="hero-unit"]')
      .should('have.length', 2)
  })
}) 