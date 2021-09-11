const url = "https://ticket-box.s3.eu-central-1.amazonaws.com/index.html";
describe("", () => {
  beforeEach(()=> cy.visit(url));
 
  it("Preenchimento dos input", () => {
    const firstName = "Junior";
    const lastName = "Soares";
    // Buscar e preencher os campos
    cy.get("#first-name").type(firstName);
    cy.get("#last-name").type(lastName);
    cy.get("#email").type("exemplo@teste.com.br");
    cy.get("#requests").type("vegetarian");
    cy.get("#signature").type(`${firstName} ${lastName}`);
  
 });

 it('Selecionar tickt 2', () => {
    // Campo select
   cy.get("#ticket-quantity").select("2");
 });

 it('Selecionar checkbox VIP', () => {
   cy.get('#vip').check();
 });
 it('Selecionar Social midia', () => {
   cy.get('#social-media').check();
 });
 it('Selecionar friend e publication e desmarcar friend', () => {
   cy.get('#friend').check();
   cy.get('#publication').check();
   cy.get('#friend').uncheck();
 });
 
  it("Verificar se contem o texo", () => {
    cy.get('header h1').should("contain","TICKETBOX");
  });

  it('verificar email invalid', () => {
    cy.get('#email')
      .as('email')
      .type("teste.com.br");
    cy.get('#email.invalid').should('exist');

    cy.get('@email')
      .clear()
      .type("junior@gmail.com");
    cy.get('#email.invalid').should('not.exist');
  });

  it('Preencher e resetar todos os campos', () => {
    const firstName = "Junior";
    const lastName = "Soares";
    const fullName = `${firstName} ${lastName}`;
    // Buscar e preencher os campos
    cy.get("#first-name").type(firstName);
    cy.get("#last-name").type(lastName);
    cy.get("#email").type("exemplo@teste.com.br");
    cy.get("#ticket-quantity").select("2");
    cy.get('#vip').check();
    cy.get('#friend').check();
    cy.get("#requests").type("IPA beer");

    cy.get('.agreement p').should(
      "contain",
      `I, ${fullName}, wish to buy 2 VIP tickets.`
    );

    cy.get('#agree').click();
    cy.get('#signature').type(fullName);

    cy.get("button[type='submit']")
      .as("submitButton")
      .should("not.be.disabled");

    cy.get("button[type='reset']").click();

    cy.get('@submitButton').should("be.disabled");
  });


  it('Usando a classe support', () => {
    // criando um json
    const customer = {
      firstName: "Junior",
      lastName: "soares",
      email: "juniorpsraes@gmail.com"
    };

    cy.fillMandatoryFields(customer);
    
    cy.get("button[type='submit']")
      .as("submitButton")
      .should("not.be.disabled");

    cy.get("button[type='reset']").click();

    cy.get('@submitButton').should("be.disabled");

    
  });
});