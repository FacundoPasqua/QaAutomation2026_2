/// <reference types="cypress" />
/**
 * CLASE: Testing de APIs con Cypress (Toolshop)
 * Sitio: https://practicesoftwaretesting.com
 * API:   https://api.practicesoftwaretesting.com   <- es el baseUrl (cypress.config.js)
 *
 * Cada describe corresponde a una lámina de la presentación.
 * Para correr todo:   npx cypress run
 * Para verlo en vivo: npx cypress open
 */

const EMAIL = 'customer@practicesoftwaretesting.com'
const PASSWORD = 'welcome01'

// ─────────────────────────────────────────────
// Lámina 10 · Tu primer cy.request()
// ─────────────────────────────────────────────
describe('Lámina 10 · Primer cy.request()', () => {
  it('GET /products responde 200', () => {
    cy.request('/products').its('status').should('eq', 200)
  })

  it('la primera página trae 9 productos', () => {
    cy.request('/products').its('body.data').should('have.length', 9)
  })

  it('el query param ?page=2 devuelve la página 2', () => {
    cy.request('/products?page=2')
      .its('body.current_page')
      .should('eq', 2)
  })
})

// ─────────────────────────────────────────────
// Lámina 11 · Aserciones sobre la response
// ─────────────────────────────────────────────
describe('Lámina 11 · Aserciones sobre la response', () => {
  it('GET /products responde bien', () => {
    cy.request('/products').then((res) => {
      expect(res.status).to.eq(200)
      expect(res.headers['content-type'])
        .to.include('application/json')
      expect(res.duration).to.be.lessThan(2000)
    })
  })

  it('cada producto trae los campos clave', () => {
    cy.request('/products').then((res) => {
      const productos = res.body.data
      expect(productos).to.have.length(9)
      productos.forEach((p) => {
        expect(p).to.include.keys('id', 'name', 'price')
        expect(p.name).to.be.a('string')
      })
    })
  })
})

// ─────────────────────────────────────────────
// Lámina 12 · Probar errores con failOnStatusCode
// ─────────────────────────────────────────────
describe('Lámina 12 · Probar errores con failOnStatusCode', () => {
  it('un producto inexistente devuelve 404', () => {
    cy.request({
      url: '/products/id-que-no-existe',
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404)
      expect(res.body.message)
        .to.eq('Requested item not found')
    })
  })

  it('/users/me sin token devuelve 401', () => {
    cy.request({
      url: '/users/me',
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401)
      expect(res.body.message).to.eq('Unauthorized')
    })
  })
})

// ─────────────────────────────────────────────
// Lámina 13 · POST: hacer login
// ─────────────────────────────────────────────
describe('Lámina 13 · POST: hacer login', () => {
  it('login correcto devuelve un token', () => {
    cy.request('POST', '/users/login', {
      email: 'customer@practicesoftwaretesting.com',
      password: 'welcome01',
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property('access_token')
      expect(res.body.token_type).to.eq('bearer')
      expect(res.body.expires_in).to.eq(300)
    })
  })

  const casos = [
    ['contraseña mala', { email: EMAIL, password: 'x' },
      'Unauthorized'],
    ['body vacío', {}, 'Invalid login request'],
  ]
  casos.forEach(([nombre, body, error]) => {
    it(`login falla con ${nombre}`, () => {
      cy.request({ method: 'POST', url: '/users/login',
        body, failOnStatusCode: false }).then((res) => {
        expect(res.status).to.eq(401)
        expect(res.body.error).to.eq(error)
      })
    })
  })
})

// ─────────────────────────────────────────────
// Lámina 14 · POST: crear datos y el 201
// ─────────────────────────────────────────────
describe('Lámina 14 · POST: crear datos y el 201', () => {
  it('registrar un usuario devuelve 201', () => {
    cy.request('POST', '/users/register', {
      first_name: 'Test',
      last_name: 'Clase',
      email: `clase.${Date.now()}@example.com`,
      password: 'Sup3r-Secret!2026',
      dob: '1990-01-01',
      phone: '1122334455',
      address: { street: 'Calle 123', city: 'Buenos Aires',
        state: 'CABA', country: 'AR', postal_code: '1000' },
    }).then((res) => {
      expect(res.status).to.eq(201)
      expect(res.body).to.have.property('id')
    })
  })

  it('registrar sin datos devuelve 422', () => {
    cy.request({
      method: 'POST',
      url: '/users/register',
      body: {},
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(422)
      expect(res.body).to.have.all.keys(
        'first_name', 'last_name', 'email', 'password')
    })
  })

  it('crear un carrito devuelve 201', () => {
    cy.request('POST', '/carts', {}).then((res) => {
      expect(res.status).to.eq(201)
      expect(res.body).to.have.property('id')
    })
  })
})

// ─────────────────────────────────────────────
// Lámina 15 · Autenticación con token
// ─────────────────────────────────────────────
describe('Lámina 15 · Autenticación con token', () => {
  describe('rutas con token', () => {
    let token
    beforeEach(() => {
      cy.request('POST', '/users/login', {
        email: EMAIL, password: PASSWORD,
      }).then((res) => { token = res.body.access_token })
    })
    it('GET /users/me con token devuelve 200', () => {
      cy.request({
        url: '/users/me',
        headers: { Authorization: `Bearer ${token}` },
      }).its('status').should('eq', 200)
    })
  })

  it('perfil con apiLogin', () => {
    cy.apiLogin().then((token) => {
      cy.request({ url: '/users/me',
        headers: { Authorization: `Bearer ${token}` },
      }).its('body.first_name').should('eq', 'Jane')
    })
  })
})

// ─────────────────────────────────────────────
// Lámina 16 · cy.intercept(): espiar
// ─────────────────────────────────────────────
describe('Lámina 16 · cy.intercept(): espiar', () => {
  it('espía el request a /products', () => {
    cy.intercept({ method: /GET|QUERY/, url: '**/products*' }).as('productos')
    cy.visit('https://practicesoftwaretesting.com')
    cy.wait('@productos')
      .its('response.statusCode')
      .should('eq', 200)
  })

  it('revisa request y response de la tienda', () => {
    cy.intercept({ method: /GET|QUERY/, url: '**/products*' }).as('productos')
    cy.visit('https://practicesoftwaretesting.com')
    cy.wait('@productos').then(({ request, response }) => {
      expect(request.method).to.match(/GET|QUERY/)
      expect(response.statusCode).to.eq(200)
      expect(response.body.data).to.have.length.greaterThan(0)
    })
  })
})

// ─────────────────────────────────────────────
// Lámina 17 · cy.intercept(): mockear
// ─────────────────────────────────────────────
describe('Lámina 17 · cy.intercept(): mockear', () => {
  it('muestra los productos del fixture', () => {
    cy.intercept({ method: /GET|QUERY/, url: '**/products*' },
      { fixture: 'productos.json' }).as('productos')
    cy.visit('https://practicesoftwaretesting.com')
    cy.wait('@productos')
    cy.contains('Pinza de prueba').should('be.visible')
    cy.contains('Martillo de prueba').should('be.visible')
  })

  it('la tienda tolera un error 500', () => {
    cy.intercept({ method: /GET|QUERY/, url: '**/products*' }, {
      statusCode: 500,
      body: { message: 'Server Error' },
    }).as('productos')
    cy.visit('https://practicesoftwaretesting.com')
    cy.wait('@productos').its('response.statusCode')
      .should('eq', 500)
    cy.contains('Combination Pliers').should('not.exist')
  })

  it('lista vacía: la tienda no muestra productos', () => {
    cy.intercept({ method: /GET|QUERY/, url: '**/products*' }, {
      body: { current_page: 1, data: [], from: null,
        last_page: 1, per_page: 9, to: null, total: 0 },
    }).as('productos')
    cy.visit('https://practicesoftwaretesting.com')
    cy.wait('@productos')
      .its('response.body.data')
      .should('have.length', 0)
    cy.contains('Combination Pliers').should('not.exist')
  })

  it('respuesta lenta (delay de 3 segundos)', () => {
    cy.intercept({ method: /GET|QUERY/, url: '**/products*' },
      { fixture: 'productos.json', delay: 3000 }).as('productos')
    cy.visit('https://practicesoftwaretesting.com')
    cy.contains('Pinza de prueba', { timeout: 10000 })
      .should('be.visible')
  })
})
