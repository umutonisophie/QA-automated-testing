describe('Automation Exercise - End to End Journeys', () => {

  let registeredEmail;
  const password = 'Pass123!';
  it('Test Case 1: Verify Homepage Loads and Logo is Visible', () => {
    cy.visit('https://automationexercise.com');
    cy.url().should('include', 'automationexercise.com');
    cy.get('.logo').should('be.visible');
    cy.get('.shop-menu').should('be.visible');
  });

  it('Test Case 2: Register a New User', () => {
    registeredEmail = `student_${Date.now()}@test.com`;

    cy.visit('https://automationexercise.com');
    cy.contains('Signup / Login').click();

    cy.get('[data-qa="signup-name"]').type('Test User');
    cy.get('[data-qa="signup-email"]').type(registeredEmail);
    cy.get('[data-qa="signup-button"]').click();

    cy.get('[data-qa="password"]').type(password);
    cy.get('[data-qa="first_name"]').type('First');
    cy.get('[data-qa="last_name"]').type('Last');
    cy.get('[data-qa="address"]').type('123 QA Lane');
    cy.get('[data-qa="country"]').select('United States');
    cy.get('[data-qa="state"]').type('California');
    cy.get('[data-qa="city"]').type('Los Angeles');
    cy.get('[data-qa="zipcode"]').type('90001');
    cy.get('[data-qa="mobile_number"]').type('1234567890');

    cy.get('[data-qa="create-account"]').click();
    cy.get('[data-qa="continue-button"]').click();

    cy.contains('Logout').click();
  });

  it('Test Case 3: Login With Valid Credentials', () => {
    cy.visit('https://automationexercise.com');
    cy.contains('Signup / Login').click();

    cy.get('[data-qa="login-email"]').type(registeredEmail);
    cy.get('[data-qa="login-password"]').type(password);
    cy.get('[data-qa="login-button"]').click();

    cy.contains('Logged in as').should('be.visible');
    cy.contains('Logout').click();
  });

  it('Test Case 4: Login With Invalid Credentials', () => {
    cy.visit('https://automationexercise.com');
    cy.contains('Signup / Login').click();

    cy.get('[data-qa="login-email"]').type('invalid_user_999@test.com');
    cy.get('[data-qa="login-password"]').type('WrongPassword!');
    cy.get('[data-qa="login-button"]').click();

    cy.contains('incorrect', { matchCase: false }).should('be.visible');
  });

  it('Test Case 5: Search for a Product', () => {
    cy.visit('https://automationexercise.com');
    cy.contains('Products').click();

    cy.url().should('include', '/products');
    cy.get('.title').should('contain', 'All Products');

    cy.get('#search_product').type('dress');
    cy.get('#submit_search').click();

    cy.get('.title').should('contain', 'Searched Products');
    cy.get('.productinfo').should('contain', 'Dress');
  });

  it('Test Case 6: View Product Details', () => {
    cy.visit('https://automationexercise.com');
    cy.contains('Products').click();

    cy.get('.choose > .nav > li > a').first().click();

    cy.url().should('include', '/product_details');
    cy.get('.product-information').should('be.visible');

    cy.get('.product-information > h2').should('be.visible');
    cy.get('.product-information > p').contains('Category:').should('be.visible');
    cy.get('.product-information > span > span').should('be.visible');
    cy.get('.product-information > p').contains('Availability:').should('be.visible');
    cy.get('.product-information > p').contains('Condition:').should('be.visible');
    cy.get('.product-information > p').contains('Brand:').should('be.visible');
  });
});
it('Test Case 7: Add Product to Cart', () => {
  cy.visit('https://automationexercise.com');
  cy.contains('Products').click();
  
  // Add first product and open cart
  cy.get('.add-to-cart').first().click();
  cy.get('u').click(); 

  // Assertions
  cy.url().should('include', '/view_cart');
  cy.get('.cart_description').should('be.visible');
  cy.get('.cart_price').should('be.visible');
  cy.get('.cart_quantity').should('be.visible');
});
it('Test Case 8: Remove Product From Cart', () => {
  cy.visit('https://automationexercise.com');
  cy.contains('Products').click();
  
  // Add product and open cart
  cy.get('.add-to-cart').first().click();
  cy.get('u').click(); 

  // Click the remove 'x' button
  cy.get('.cart_quantity_delete').first().click();

  // Verify the cart becomes empty
  cy.get('#empty_cart').should('be.visible');
});
it('Test Case 9: Submit Contact Us Form', () => {
  cy.visit('https://automationexercise.com');
  cy.contains('Contact us').click();

  cy.get('[data-qa="name"]').type('A');
  cy.get('[data-qa="email"]').type('a@b.com');
  cy.get('[data-qa="subject"]').type('B');
  cy.get('[data-qa="message"]').type('C');

  cy.on('window:confirm', (txt) => expect(txt).to.include('Press OK'));
  
  cy.get('[data-qa="submit-button"]').click();
  cy.get('.status').should('be.visible');
});
