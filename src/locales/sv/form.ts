export default {
  login: {
    title: 'Logga in',
    input: {
      email: {
        label: 'E-post',
        placeholder: 'Skriv in e-post',
        error: {
          empty: 'Du måste skriva in en e-post',
          'not-valid': 'E-posten är inte giltig',
        },
      },
      password: {
        label: 'Lösenord',
        placeholder: 'Skriv in lösenord',
        error: {
          empty: 'Du måste skriva in ett lösenord',
        },
      },
    },
    error: 'E-post eller lösenord är felaktiga',
    button: 'Logga in',
    link: {
      'not-a-user': 'Inget konto?',
      forgot: 'Glömt lösenord?',
    },
  },
  register: {
    title: 'Registrera användare',
    button: 'Registrera',
    success:
      'Användaren är skapad. För att kunna logga in måste du få access. Du kommer få ett mail när detta är klart.',
    error: 'Kunde inte skapa användaren. Kontakta oss med nummer {{requestId}} för hjälp',
    input: {
      'first-name': {
        label: 'Förnamn',
        placeholder: 'Skriv in förnamn',
        error: {
          empty: 'Du måste skriva in ett förnamn',
        },
      },
      'last-name': {
        label: 'Efternamn',
        placeholder: 'Skriv in efternamn',
        error: {
          empty: 'Du måste skriva in ett efternamn',
        },
      },
      'confirm-password': {
        label: 'Bekfräfta lösenord',
        placeholder: 'Skriv in lösenord igen',
        error: {
          empty: 'Du måste bekräfta lösenordet',
        },
      },
    },
  },
  reset: {
    title: 'Återställ lösenord',
    button: 'Återställ',
    success: 'En e-post har skickats till din mailaddress med instruktioner för att återställa lösenord.',
    link: {
      login: 'Logga in',
    },
  },
  conversation: {
    title: 'Ny konversation',
    input: {
      message: {
        label: 'Meddelande',
        placeholder: 'Skriv meddelande',
      },
    },
  },
  user: {
    title: {
      create: 'Skapa ny användare',
      update: 'Uppdatera användare',
    },
    input: {
      firstName: { label: 'Förnamn', placeholder: 'Skriv in förnamn' },
      lastName: { label: 'Efternamn', placeholder: 'Skriv in efternamn' },
      roles: { label: 'Roller' },
      users: { error: 'Du måste välja minst en användare' },
      apps: { error: 'Du måste välja minst en applikation' },
    },
    success: {
      create: 'Användaren är skapad.',
      update: 'Användare är uppdaterad',
    },
    error: {
      create: 'Kunde inte skapa användaren',
      roles: 'Du måste välja minst en roll',
    },
  },
};
