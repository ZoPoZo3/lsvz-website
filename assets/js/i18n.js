/* LSVZ: minimal EN/ES/DE dictionary for UI chrome and section copy.
   Longer placeholder narrative (bios, history body, event descriptions)
   stays English-only in this first template pass; expand per PRODUCT.md. */

(function () {
  var STORAGE_KEY = "lsvz-lang";

  var dict = {
    en: {
      "nav.home": "Home",
      "nav.history": "History",
      "nav.upcoming": "Upcoming Events",
      "nav.past": "Past Events",
      "nav.staff": "Staff",
      "nav.join": "Become a Member",
      "cta.join": "Become a member",
      "cta.seeEvents": "See upcoming events",
      "cta.openForm": "Open the membership form",
      "cta.buyTickets": "Buy tickets",

      "hero.title.html": "Home is closer than <em>you think</em>.",
      "hero.lede": "LSVZ brings together Latin American and Spanish students across Zurich's universities, for culture, community, and a few good excuses to dance on a Tuesday.",
      "hero.stat1.label": "Founded",
      "hero.stat1.value": "2006",
      "hero.stat2.label": "Members",
      "hero.stat2.value": "150+",
      "hero.stat3.label": "Events / year",
      "hero.stat3.value": "12+",

      "mission.kicker": "Why we exist",
      "mission.title": "A home base for the Latin American and Spanish community in Zurich.",
      "mission.lede": "Founded by students who missed home, LSVZ is the bridge between Latin American and Spanish culture and student life in Switzerland, open to anyone who wants in.",
      "mission.pillar1.title": "Community",
      "mission.pillar1.body": "A network of students who understand exactly what it's like to build a life far from home.",
      "mission.pillar2.title": "Culture",
      "mission.pillar2.body": "Music, food, film and traditions from across Latin America and Spain, kept alive in Zurich.",
      "mission.pillar3.title": "Support",
      "mission.pillar3.body": "Practical help settling into Swiss university life, from newcomers to graduating seniors.",

      "home.eventsTeaser.kicker": "The vibe",
      "home.eventsTeaser.title": "This is what our events look like",

      "history.kicker": "Our story",
      "history.title": "How LSVZ came to be.",
      "history.lede": "From a handful of ETH and UZH students in 2006 to the community it is today, LSVZ's history is really several stories: a founding, a rebirth, a stretch of hard-won momentum, a quiet lull, and a comeback.",

      "history.tl1.year": "2006",
      "history.tl1.title": "The Latin Club is founded",
      "history.tl1.teaser": "A handful of ETH and UZH students start the Latin Club.",
      "history.tl1.body": "A group of students from the University of Zurich and ETH founded the Latin Club (CL ZH). Nicolas Berlinger served as its first president, succeeded that same year by Jessica Valderrama.",

      "history.tl2.year": "2007",
      "history.tl2.title": "Reborn as LSVZ",
      "history.tl2.teaser": "Re-founded as the Latino Studentenverein Zürich.",
      "history.tl2.body": "After Mónica Welter's term as the Latin Club's last president, Guillem Daniel and Eric Carrera re-founded the association as the Latino Studentenverein Zürich. Under the new name, the statutes were amended to include Portuguese-speaking students.",

      "history.tl3.year": "2010",
      "history.tl3.title": "Building visibility on campus",
      "history.tl3.teaser": "A new board sets out to put LSVZ on the map.",
      "history.tl3.body": "A new board set out to organize, structure and promote the association. José Parra Moyano, then an economics student, took on the presidency alongside Guillem Daniel and board members old and new, including Adrián Martínez, Michael Hornung, Nicolás Andrey, Erika Cordova and Claudia Ramos, driving events that raised LSVZ's profile across the ETH and UZH campuses while reaching out to Switzerland-based companies active in Latin America.",

      "history.tl4.year": "2010-2011",
      "history.tl4.title": "Academic and professional roots",
      "history.tl4.teaser": "Academic ties and an ETH grant follow.",
      "history.tl4.body": "A lecture by Dr. iur. Hans Ulrich Pestalozzi, sponsorship and collaboration from PuntoLatino, and a new relationship with the Latin American Chamber of Commerce in Switzerland followed. A grant from ETH helped fund the semesters that came next.",

      "history.tl5.year": "Same era",
      "history.tl5.title": "Parties, barbecues and a growing community",
      "history.tl5.teaser": "Parties, barbecues, and a growing community.",
      "history.tl5.body": "With academic-professional visibility achieved and LSVZ's funds a little fuller, the association organized parties, barbecues and sports teams, helping newly arrived students find their place in an already established community.",

      "history.quote": "It was a tough, laborious but very enjoyable journey, turning what began in 2008 as an exciting project into a successful reality. For the board members of those years, the lasting memory is of a group of friends who, by combining dreams and effort, spent wonderful afternoons building something still relevant in Zurich's university life today.",

      "history.tl6.year": "A new chapter",
      "history.tl6.title": "The reactivation",
      "history.tl6.teaser": "A new generation reactivates the association.",
      "history.tl6.body": "After a few quieter years, a new group of Spanish students stepped up to reactivate the association. Board members Alex Clavillé, Tomás Gallardo, Nitu Pantaleoni, Carmen Parra, Jaime Plaza, Valeria Salame and Alexander Keller, led by president Pere Molins, brought LSVZ back to the center of university life, organizing cultural events, parties and gatherings, and restoring ties with the universities and their student associations.",

      "eventsUpcoming.kicker": "Save the date",
      "eventsUpcoming.title": "Upcoming events",
      "eventsUpcoming.lede": "From welcome fiestas to cultural nights, here's what's coming up once it's confirmed.",
      "eventsUpcoming.emptyTitle": "Nothing on the calendar yet",
      "eventsUpcoming.emptyBody": "We're planning our next event. Check back soon, or follow us on Instagram for the announcement.",

      "eventsPast.kicker": "Look back",
      "eventsPast.title": "Past events",
      "eventsPast.lede": "A photo record of every party, gathering and celebration LSVZ has hosted. Step into an event to see who was there.",

      "cta.seePhotos": "See photos",
      "cta.seeMorePhotos": "See more photos",
      "cta.backToPastEvents": "Past events",

      "staff.kicker": "Who runs LSVZ",
      "staff.title": "Meet the team",
      "staff.lede": "Meet the people who make LSVZ possible.",
      "staff.placeholderName": "Full name",
      "staff.placeholderLocation": "City, country",
      "staff.role.president": "President",
      "staff.role.vicePresident": "Vice President",
      "staff.role.treasurer": "Treasurer",
      "staff.role.social": "Social Media & Communications",
      "staff.role.events": "Events",
      "staff.role.design": "Web Design",
      "staff.groupPhoto": "Full team photo",

      "join.kicker": "Join us",
      "join.title": "Become a member",
      "join.lede": "Membership is quick, and it's how you get first access to events, the community chat and the mailing list.",
      "join.benefitsTitle": "Why join",
      "join.benefit1": "Priority access to events, several of which sell out",
      "join.benefit2": "A community that already feels like home",
      "join.benefit3": "A voice in what LSVZ organizes next",
      "join.openToAll": "You don't have to be Latino or a Spanish speaker: if you feel at home in the community, there's a place for you here.",
      "join.formCta": "Fill out the membership form",
      "join.formHint": "It's the same form connected to our membership records. Takes less than a minute and opens in a new tab.",

      "footer.about.title": "LSVZ",
      "footer.about.body": "Latino & Hispanic Student Association of Zurich.",
      "footer.nav.title": "Explore",
      "footer.contact.title": "Contact",
      "footer.contact.email": "hello@lsvz.ch",
      "footer.rights": "All rights reserved.",
      "footer.credit": "Made with care in Zurich."
    },
    es: {
      "nav.home": "Inicio",
      "nav.history": "Historia",
      "nav.upcoming": "Próximos eventos",
      "nav.past": "Eventos pasados",
      "nav.staff": "Equipo",
      "nav.join": "Hazte miembro",
      "cta.join": "Hazte miembro",
      "cta.seeEvents": "Ver próximos eventos",
      "cta.openForm": "Abrir el formulario",
      "cta.buyTickets": "Comprar entradas",

      "hero.title.html": "Tu casa está más cerca de lo que <em>crees</em>.",
      "hero.lede": "LSVZ reúne a estudiantes latinoamericanos y españoles de las universidades de Zürich: cultura, comunidad y alguna que otra excusa para bailar en pleno martes.",
      "hero.stat1.label": "Fundada en",
      "hero.stat1.value": "2006",
      "hero.stat2.label": "Miembros",
      "hero.stat2.value": "150+",
      "hero.stat3.label": "Eventos / año",
      "hero.stat3.value": "12+",

      "mission.kicker": "Por qué existimos",
      "mission.title": "Un punto de encuentro para la comunidad latina y española en Zürich.",
      "mission.lede": "LSVZ nació de estudiantes que echaban de menos su casa. Hoy es el puente entre la cultura latinoamericana y española y la vida universitaria en Suiza, abierta a quien quiera sumarse.",
      "mission.pillar1.title": "Comunidad",
      "mission.pillar1.body": "Una red de estudiantes que entienden exactamente lo que es construir una vida lejos de casa.",
      "mission.pillar2.title": "Cultura",
      "mission.pillar2.body": "Música, comida, cine y tradiciones de Latinoamérica y España, vivas en Zürich.",
      "mission.pillar3.title": "Apoyo",
      "mission.pillar3.body": "Ayuda práctica para instalarse en la vida universitaria suiza, desde recién llegados hasta último curso.",

      "home.eventsTeaser.kicker": "El ambiente",
      "home.eventsTeaser.title": "Así vivimos nuestros eventos",

      "history.kicker": "Nuestra historia",
      "history.title": "Cómo nació LSVZ.",
      "history.lede": "De un puñado de estudiantes de la ETH y la UZH en 2006 a la comunidad que es hoy, la historia de LSVZ es en realidad varias historias: una fundación, un renacimiento, una época de mucho esfuerzo, una pausa tranquila y una vuelta a empezar.",

      "history.tl1.year": "2006",
      "history.tl1.title": "Nace el Latin Club",
      "history.tl1.teaser": "Un puñado de estudiantes de la ETH y la UZH fundan el Latin Club.",
      "history.tl1.body": "Un grupo de estudiantes de la Universidad de Zúrich y la ETH fundó el Latin Club (CL ZH). Nicolas Berlinger fue su primer presidente, sucedido ese mismo año por Jessica Valderrama.",

      "history.tl2.year": "2007",
      "history.tl2.title": "Renace como LSVZ",
      "history.tl2.teaser": "Se refunda como Latino Studentenverein Zürich.",
      "history.tl2.body": "Tras el mandato de Mónica Welter, última presidenta del Latin Club, Guillem Daniel y Eric Carrera refundaron la asociación como Latino Studentenverein Zürich. Con el nuevo nombre, los estatutos se modificaron para incluir a estudiantes lusófonos.",

      "history.tl3.year": "2010",
      "history.tl3.title": "Ganando visibilidad en el campus",
      "history.tl3.teaser": "Una nueva junta se propone poner a LSVZ en el mapa.",
      "history.tl3.body": "Una nueva junta se propuso organizar, estructurar y dar a conocer la asociación. José Parra Moyano, entonces estudiante de económicas, asumió la presidencia junto a Guillem Daniel y otros miembros de junta, antiguos y nuevos, entre ellos Adrián Martínez, Michael Hornung, Nicolás Andrey, Erika Cordova y Claudia Ramos. Juntos impulsaron eventos que dieron visibilidad a LSVZ en los campus de la ETH y la UZH, y se acercaron a empresas con sede en Suiza y actividad en Latinoamérica.",

      "history.tl4.year": "2010-2011",
      "history.tl4.title": "Raíces académicas y profesionales",
      "history.tl4.teaser": "Llegan lazos académicos y una beca de la ETH.",
      "history.tl4.body": "Llegaron una conferencia del Dr. iur. Hans Ulrich Pestalozzi, el patrocinio y la colaboración de PuntoLatino, y una nueva relación con la Cámara de Comercio Latinoamericana en Suiza. Una beca de la ETH ayudó a financiar los siguientes semestres.",

      "history.tl5.year": "Misma época",
      "history.tl5.title": "Fiestas, barbacoas y una comunidad que crece",
      "history.tl5.teaser": "Fiestas, barbacoas y una comunidad que crece.",
      "history.tl5.body": "Con más visibilidad y algo más de presupuesto, la asociación organizó fiestas, barbacoas y equipos deportivos, ayudando a los estudiantes recién llegados a integrarse en una comunidad ya consolidada.",

      "history.quote": "Fue un camino duro, laborioso pero muy gratificante: convertir lo que en 2008 empezó como un proyecto ilusionante en una realidad de éxito. Para los miembros de junta de aquellos años, el recuerdo que perdura es el de un grupo de amigos que, combinando sueños y esfuerzo, pasó tardes maravillosas construyendo algo que todavía hoy tiene un papel relevante en la vida universitaria de Zúrich.",

      "history.tl6.year": "Un nuevo capítulo",
      "history.tl6.title": "La reactivación",
      "history.tl6.teaser": "Una nueva generación reactiva la asociación.",
      "history.tl6.body": "Tras unos años más tranquilos, un nuevo grupo de estudiantes españoles tomó la iniciativa de reactivar la asociación. Los miembros de junta Alex Clavillé, Tomás Gallardo, Nitu Pantaleoni, Carmen Parra, Jaime Plaza, Valeria Salame y Alexander Keller, junto al nuevo presidente Pere Molins, devolvieron a LSVZ al centro de la vida universitaria organizando eventos culturales, fiestas y encuentros, y restableciendo las relaciones con las universidades y sus asociaciones de estudiantes.",

      "eventsUpcoming.kicker": "Reserva la fecha",
      "eventsUpcoming.title": "Próximos eventos",
      "eventsUpcoming.lede": "Desde fiestas de bienvenida hasta noches culturales, esto es lo que viene en cuanto lo confirmemos.",
      "eventsUpcoming.emptyTitle": "Todavía no hay nada en el calendario",
      "eventsUpcoming.emptyBody": "Estamos preparando el próximo evento. Vuelve pronto o síguenos en Instagram para enterarte.",

      "eventsPast.kicker": "Mirando atrás",
      "eventsPast.title": "Eventos pasados",
      "eventsPast.lede": "Un archivo fotográfico de cada fiesta, quedada y celebración que ha organizado LSVZ. Entra en cualquier evento para ver quién estuvo allí.",

      "cta.seePhotos": "Ver fotos",
      "cta.seeMorePhotos": "Ver más fotos",
      "cta.backToPastEvents": "Eventos pasados",

      "staff.kicker": "Quién forma LSVZ",
      "staff.title": "Conoce al equipo",
      "staff.lede": "Conoce a las personas que hacen posible LSVZ.",
      "staff.placeholderName": "Nombre y apellido",
      "staff.placeholderLocation": "Ciudad, país",
      "staff.role.president": "Presidente",
      "staff.role.vicePresident": "Vicepresidente",
      "staff.role.treasurer": "Tesorero",
      "staff.role.social": "RRSS y comunicaciones",
      "staff.role.events": "Eventos",
      "staff.role.design": "Diseño web",
      "staff.groupPhoto": "Foto de equipo completo",

      "join.kicker": "Únete",
      "join.title": "Hazte miembro",
      "join.lede": "Hacerte miembro es rápido y te da acceso prioritario a los eventos, al chat de la comunidad y a la lista de correo.",
      "join.benefitsTitle": "Por qué unirte",
      "join.benefit1": "Acceso prioritario a eventos que muchas veces se llenan rápido",
      "join.benefit2": "Una comunidad en la que te sentirás como en casa",
      "join.benefit3": "Voz en las decisiones sobre los próximos eventos",
      "join.openToAll": "No hace falta ser latino o hispanohablante: si te sientes identificado con la comunidad, tienes tu sitio aquí.",
      "join.formCta": "Rellena el formulario de inscripción",
      "join.formHint": "Es el mismo formulario conectado a nuestro registro de socios. Tarda menos de un minuto y se abre en una pestaña nueva.",

      "footer.about.title": "LSVZ",
      "footer.about.body": "Asociación de Estudiantes Latinos e Hispanohablantes de Zürich.",
      "footer.nav.title": "Explorar",
      "footer.contact.title": "Contacto",
      "footer.contact.email": "hello@lsvz.ch",
      "footer.rights": "Todos los derechos reservados.",
      "footer.credit": "Hecho con cariño en Zúrich."
    },
    de: {
      "nav.home": "Start",
      "nav.history": "Geschichte",
      "nav.upcoming": "Kommende Events",
      "nav.past": "Vergangene Events",
      "nav.staff": "Team",
      "nav.join": "Mitglied werden",
      "cta.join": "Mitglied werden",
      "cta.seeEvents": "Kommende Events ansehen",
      "cta.openForm": "Anmeldeformular öffnen",
      "cta.buyTickets": "Tickets kaufen",

      "hero.title.html": "Zuhause ist näher, als <em>du denkst</em>.",
      "hero.lede": "LSVZ bringt lateinamerikanische und spanische Studierende an den Zürcher Universitäten zusammen: für Kultur, Gemeinschaft und den einen oder anderen guten Grund, dienstags zu tanzen.",
      "hero.stat1.label": "Gegründet",
      "hero.stat1.value": "2006",
      "hero.stat2.label": "Mitglieder",
      "hero.stat2.value": "150+",
      "hero.stat3.label": "Events / Jahr",
      "hero.stat3.value": "12+",

      "mission.kicker": "Warum es uns gibt",
      "mission.title": "Ein Zuhause für die lateinamerikanische und spanische Community in Zürich.",
      "mission.lede": "LSVZ wurde von Studierenden gegründet, die ihr Zuhause vermissten. Heute ist der Verein die Brücke zwischen lateinamerikanischer und spanischer Kultur und dem Studentenleben in der Schweiz, offen für alle, die dazugehören wollen.",
      "mission.pillar1.title": "Gemeinschaft",
      "mission.pillar1.body": "Ein Netzwerk von Studierenden, die genau wissen, wie es ist, sich fernab von zu Hause ein Leben aufzubauen.",
      "mission.pillar2.title": "Kultur",
      "mission.pillar2.body": "Musik, Essen, Filme und Traditionen aus ganz Lateinamerika und Spanien, lebendig gehalten in Zürich.",
      "mission.pillar3.title": "Unterstützung",
      "mission.pillar3.body": "Praktische Hilfe beim Einleben an der Schweizer Universität, vom Erstsemester bis zum Abschlussjahr.",

      "home.eventsTeaser.kicker": "Die Stimmung",
      "home.eventsTeaser.title": "So sehen unsere Events aus",

      "history.kicker": "Unsere Geschichte",
      "history.title": "Wie LSVZ entstanden ist.",
      "history.lede": "Von einer Handvoll ETH- und UZH-Studierenden im Jahr 2006 bis zur heutigen Community: Die Geschichte von LSVZ ist eigentlich mehrere Geschichten in einer, eine Gründung, eine Wiedergeburt, eine hart erarbeitete Aufschwungphase, eine ruhige Pause und ein Comeback.",

      "history.tl1.year": "2006",
      "history.tl1.title": "Der Latin Club wird gegründet",
      "history.tl1.teaser": "Eine Handvoll ETH- und UZH-Studierender gründet den Latin Club.",
      "history.tl1.body": "Eine Gruppe von Studierenden der Universität Zürich und der ETH gründete den Latin Club (CL ZH). Nicolas Berlinger war der erste Präsident, im selben Jahr gefolgt von Jessica Valderrama.",

      "history.tl2.year": "2007",
      "history.tl2.title": "Wiedergeburt als LSVZ",
      "history.tl2.teaser": "Neugründung als Latino Studentenverein Zürich.",
      "history.tl2.body": "Nach der Amtszeit von Mónica Welter, der letzten Präsidentin des Latin Club, gründeten Guillem Daniel und Eric Carrera den Verein als Latino Studentenverein Zürich neu. Unter dem neuen Namen wurden die Statuten angepasst, um auch portugiesischsprachige Studierende einzuschliessen.",

      "history.tl3.year": "2010",
      "history.tl3.title": "Sichtbarkeit auf dem Campus aufbauen",
      "history.tl3.teaser": "Ein neuer Vorstand bringt LSVZ auf die Landkarte.",
      "history.tl3.body": "Ein neuer Vorstand machte es sich zur Aufgabe, den Verein zu organisieren, zu strukturieren und bekannter zu machen. José Parra Moyano, damals Wirtschaftsstudent, übernahm das Präsidium gemeinsam mit Guillem Daniel und weiteren, teils neuen Vorstandsmitgliedern, darunter Adrián Martínez, Michael Hornung, Nicolás Andrey, Erika Cordova und Claudia Ramos. Gemeinsam organisierten sie Events, die LSVZ an der ETH und UZH sichtbarer machten, und knüpften Kontakte zu Unternehmen in der Schweiz mit Bezug zu Lateinamerika.",

      "history.tl4.year": "2010-2011",
      "history.tl4.title": "Akademische und berufliche Wurzeln",
      "history.tl4.teaser": "Akademische Verbindungen und ein ETH-Stipendium folgen.",
      "history.tl4.body": "Ein Vortrag von Dr. iur. Hans Ulrich Pestalozzi, Sponsoring und Zusammenarbeit mit PuntoLatino sowie eine neue Beziehung zur Lateinamerikanischen Handelskammer in der Schweiz folgten. Ein Stipendium der ETH half, die folgenden Semester zu finanzieren.",

      "history.tl5.year": "Gleiche Ära",
      "history.tl5.title": "Partys, Grillfeste und eine wachsende Community",
      "history.tl5.teaser": "Partys, Grillfeste und eine wachsende Community.",
      "history.tl5.body": "Mit akademisch-beruflicher Sichtbarkeit und etwas volleren Vereinskassen organisierte LSVZ Partys, Grillfeste und Sportteams und half neu angekommenen Studierenden, sich in einer bereits etablierten Community zurechtzufinden.",

      "history.quote": "Es war ein harter, mühsamer, aber sehr schöner Weg: das, was 2008 als aufregendes Projekt begann, in eine erfolgreiche Realität zu verwandeln. Für die Vorstandsmitglieder jener Jahre bleibt die Erinnerung an eine Gruppe von Freunden, die mit Träumen und Einsatz wunderbare Nachmittage damit verbrachten, etwas aufzubauen, das im Zürcher Studentenleben bis heute Bestand hat.",

      "history.tl6.year": "Ein neues Kapitel",
      "history.tl6.title": "Die Reaktivierung",
      "history.tl6.teaser": "Eine neue Generation reaktiviert den Verein.",
      "history.tl6.body": "Nach ein paar ruhigeren Jahren übernahm eine neue Gruppe spanischer Studierender die Initiative, den Verein zu reaktivieren. Die Vorstandsmitglieder Alex Clavillé, Tomás Gallardo, Nitu Pantaleoni, Carmen Parra, Jaime Plaza, Valeria Salame und Alexander Keller brachten unter der Leitung von Präsident Pere Molins LSVZ zurück ins Zentrum des Universitätslebens, organisierten kulturelle Events, Partys und Treffen und stellten die Beziehungen zu den Universitäten und ihren Studierendenverbänden wieder her.",

      "eventsUpcoming.kicker": "Termin vormerken",
      "eventsUpcoming.title": "Kommende Events",
      "eventsUpcoming.lede": "Von Welcome-Fiestas bis zu Kulturabenden: Das kommt als Nächstes, sobald es feststeht.",
      "eventsUpcoming.emptyTitle": "Noch nichts im Kalender",
      "eventsUpcoming.emptyBody": "Wir planen gerade unser nächstes Event. Schau bald wieder vorbei oder folge uns auf Instagram für die Ankündigung.",

      "eventsPast.kicker": "Rückblick",
      "eventsPast.title": "Vergangene Events",
      "eventsPast.lede": "Ein Fotoarchiv jeder Party, jedes Treffens und jeder Feier, die LSVZ veranstaltet hat. Öffne ein Event und sieh nach, wer dabei war.",

      "cta.seePhotos": "Fotos ansehen",
      "cta.seeMorePhotos": "Mehr Fotos ansehen",
      "cta.backToPastEvents": "Vergangene Events",

      "staff.kicker": "Wer LSVZ leitet",
      "staff.title": "Das Team",
      "staff.lede": "Lerne die Menschen kennen, die LSVZ möglich machen.",
      "staff.placeholderName": "Vor- und Nachname",
      "staff.placeholderLocation": "Stadt, Land",
      "staff.role.president": "Präsident",
      "staff.role.vicePresident": "Vizepräsident",
      "staff.role.treasurer": "Kassenwart",
      "staff.role.social": "Social Media & Kommunikation",
      "staff.role.events": "Events",
      "staff.role.design": "Webdesign",
      "staff.groupPhoto": "Foto des ganzen Teams",

      "join.kicker": "Mach mit",
      "join.title": "Mitglied werden",
      "join.lede": "Die Mitgliedschaft ist schnell erledigt und verschafft dir bevorzugten Zugang zu Events, dem Community-Chat und der Mailingliste.",
      "join.benefitsTitle": "Warum mitmachen",
      "join.benefit1": "Bevorzugter Zugang zu Events, die oft schnell ausgebucht sind",
      "join.benefit2": "Eine Community, die sich schon wie zu Hause anfühlt",
      "join.benefit3": "Mitsprache bei den nächsten Events von LSVZ",
      "join.openToAll": "Du musst weder lateinamerikanisch noch spanischsprachig sein: Wenn du dich in der Community zuhause fühlst, hast du hier deinen Platz.",
      "join.formCta": "Anmeldeformular ausfüllen",
      "join.formHint": "Es ist dasselbe Formular, das mit unseren Mitgliederdaten verknüpft ist. Dauert weniger als eine Minute und öffnet sich in einem neuen Tab.",

      "footer.about.title": "LSVZ",
      "footer.about.body": "Latino & Hispanic Student Association of Zurich.",
      "footer.nav.title": "Entdecken",
      "footer.contact.title": "Kontakt",
      "footer.contact.email": "hello@lsvz.ch",
      "footer.rights": "Alle Rechte vorbehalten.",
      "footer.credit": "Mit Liebe in Zürich gemacht."
    }
  };

  var labels = {
    es: { 'a11y.skip': 'Saltar al contenido', 'a11y.nav': 'Navegación principal', 'a11y.menu': 'Abrir o cerrar menú', 'a11y.language': 'Elegir idioma', 'a11y.photo': 'Abrir foto {n} de {event}', 'viewer.title': 'Visor de fotos', 'viewer.close': 'Cerrar', 'viewer.prev': 'Foto anterior', 'viewer.next': 'Foto siguiente', 'viewer.photo': 'Foto {n} de {total}: {event}', 'viewer.error': 'No se ha podido cargar la foto.', 'viewer.retry': 'Reintentar', 'cta.instagram': 'Síguenos en Instagram', 'cta.browsePast': 'Ver eventos pasados', 'cta.gallery': 'Ir a los eventos', 'motion.pause': 'Pausar animación', 'motion.play': 'Reanudar animación' },
    en: { 'a11y.skip': 'Skip to content', 'a11y.nav': 'Primary navigation', 'a11y.menu': 'Open or close menu', 'a11y.language': 'Choose language', 'a11y.photo': 'Open photo {n} from {event}', 'viewer.title': 'Photo viewer', 'viewer.close': 'Close', 'viewer.prev': 'Previous photo', 'viewer.next': 'Next photo', 'viewer.photo': 'Photo {n} of {total}: {event}', 'viewer.error': 'The photo could not be loaded.', 'viewer.retry': 'Try again', 'cta.instagram': 'Follow us on Instagram', 'cta.browsePast': 'Browse past events', 'cta.gallery': 'Go to the events', 'motion.pause': 'Pause animation', 'motion.play': 'Resume animation' },
    de: { 'a11y.skip': 'Zum Inhalt springen', 'a11y.nav': 'Hauptnavigation', 'a11y.menu': 'Menü öffnen oder schliessen', 'a11y.language': 'Sprache wählen', 'a11y.photo': 'Foto {n} von {event} öffnen', 'viewer.title': 'Fotoansicht', 'viewer.close': 'Schliessen', 'viewer.prev': 'Vorheriges Foto', 'viewer.next': 'Nächstes Foto', 'viewer.photo': 'Foto {n} von {total}: {event}', 'viewer.error': 'Das Foto konnte nicht geladen werden.', 'viewer.retry': 'Erneut versuchen', 'cta.instagram': 'Folge uns auf Instagram', 'cta.browsePast': 'Vergangene Events ansehen', 'cta.gallery': 'Zu den Events', 'motion.pause': 'Animation pausieren', 'motion.play': 'Animation fortsetzen' }
  };
  Object.keys(labels).forEach(function (lang) { Object.assign(dict[lang], labels[lang]); });

  function getLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      return dict[saved] ? saved : 'es';
    } catch (error) { return document.documentElement.lang || 'es'; }
  }

  function t(key, values) {
    var text = (dict[document.documentElement.lang] || dict.es)[key] || key;
    Object.keys(values || {}).forEach(function (key) { text = text.replace('{' + key + '}', values[key]); });
    return text;
  }

  function formatDate(start, end, short) {
    var locale = { es: 'es-CH', en: 'en-GB', de: 'de-CH' }[document.documentElement.lang] || 'es-CH';
    var formatter = new Intl.DateTimeFormat(locale, { day: 'numeric', month: short ? 'short' : 'long', year: 'numeric', timeZone: 'UTC' });
    var first = new Date(start + 'T12:00:00Z');
    if (Number.isNaN(first.getTime())) return start;
    return end ? formatter.formatRange(first, new Date(end + 'T12:00:00Z')) : formatter.format(first);
  }

  function refresh(root) {
    (root || document).querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    (root || document).querySelectorAll('[data-event-date]').forEach(function (el) { el.textContent = formatDate(el.dataset.eventDate, el.dataset.eventEnd, el.dataset.dateShort === 'true'); });
    (root || document).querySelectorAll('.masonry a').forEach(function (el, i) { el.setAttribute('aria-label', t('a11y.photo', { n: i + 1, event: document.querySelector('h1').textContent })); });
  }

  function closeLangSwitch(switchEl) {
    var trigger = switchEl.querySelector(".lang-switch__trigger");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  }

  function apply(lang) {
    if (!dict[lang]) lang = 'es';
    var table = dict[lang] || dict.es;
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (table[key] != null) el.textContent = table[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (table[key] != null) el.innerHTML = table[key];
    });

    document.querySelectorAll(".lang-switch").forEach(function (switchEl) {
      switchEl.setAttribute("data-active", lang);
      var label = switchEl.querySelector(".lang-switch__current-label");
      if (label) label.textContent = lang.toUpperCase();
      closeLangSwitch(switchEl);
    });
    refresh();
    document.dispatchEvent(new CustomEvent('lsvz:languagechange', { detail: { lang: lang } }));
  }

  function setLang(lang) {
    if (!dict[lang]) return;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (error) { /* Session-only language still works. */ }
    apply(lang);
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(getLang());

    document.querySelectorAll(".lang-switch__trigger").forEach(function (trigger) {
      trigger.addEventListener("click", function (event) {
        event.stopPropagation();
        var expanded = trigger.getAttribute("aria-expanded") === "true";
        document.querySelectorAll(".lang-switch__trigger").forEach(function (other) {
          other.setAttribute("aria-expanded", "false");
        });
        trigger.setAttribute("aria-expanded", String(!expanded));
      });
    });

    document.querySelectorAll(".lang-switch__option").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang"));
        btn.closest(".lang-switch").querySelector(".lang-switch__trigger").focus();
      });
    });

    document.addEventListener("click", function (event) {
      document.querySelectorAll(".lang-switch").forEach(function (switchEl) {
        if (!switchEl.contains(event.target)) closeLangSwitch(switchEl);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        document.querySelectorAll(".lang-switch").forEach(closeLangSwitch);
      }
    });
  });

  window.LSVZ_I18N = { apply: apply, setLang: setLang, getLang: getLang, t: t, formatDate: formatDate, refresh: refresh };
})();
