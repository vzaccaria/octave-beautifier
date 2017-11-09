
nazione =       'Ing'

if strcmp(nazione, 'Inghilterra')
    tempo = 'orribile'
            cibo = 'riempie molto'
              moneta = 'il british pound'
end

if strcmp         (nazione, 'Francia')
    tempo = 'bello'
    cibo = 'è buono ma poco vegetariano'
              moneta = 'Euro'
end

messaggio=       ['Questa è la ' nazione ', il tempo è ' tempo ', il cibo ' cibo ' e la moneta è ' moneta '.']

disp(messaggio)
