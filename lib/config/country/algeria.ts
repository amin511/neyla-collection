/**
 * Algeria Wilayas and Communes Configuration
 * Complete list of all 58 wilayas and their communes
 */

export const ALGERIA_WILAYAS = [
    "Adrar",
    "Chlef",
    "Laghouat",
    "Oum El Bouaghi",
    "Batna",
    "Béjaïa",
    "Biskra",
    "Béchar",
    "Blida",
    "Bouira",
    "Tamanrasset",
    "Tébessa",
    "Tlemcen",
    "Tiaret",
    "Tizi Ouzou",
    "Alger",
    "Djelfa",
    "Jijel",
    "Sétif",
    "Saïda",
    "Skikda",
    "Sidi Bel Abbès",
    "Annaba",
    "Guelma",
    "Constantine",
    "Médéa",
    "Mostaganem",
    "M'Sila",
    "Mascara",
    "Ouargla",
    "Oran",
    "El Bayadh",
    "Illizi",
    "Bordj Bou Arreridj",
    "Boumerdès",
    "El Tarf",
    "Tindouf",
    "Tissemsilt",
    "El Oued",
    "Khenchela",
    "Souk Ahras",
    "Tipaza",
    "Mila",
    "Aïn Defla",
    "Naâma",
    "Aïn Témouchent",
    "Ghardaïa",
    "Relizane",
    "Timimoun",
    "Bordj Badji Mokhtar",
    "Ouled Djellal",
    "Béni Abbès",
    "In Salah",
    "In Guezzam",
    "Touggourt",
    "Djanet",
    "El M'Ghair",
    "El Menia",
] as const

export const ALGERIA_COMMUNES: Record<string, string[]> = {
    Adrar: ["Adrar", "Tamest", "Charouine", "Reggane", "In Zghmir", "Tit", "Ksar Kaddour", "Tsabit", "Timimoun", "Ouled Saïd", "Zaouiet Kounta", "Aoulef", "Timokten", "Tamantit", "Fenoughil", "Tinerkouk", "Deldoul", "Sali", "Akabli", "Metarfa", "Ouled Ahmed Timmi", "Bouda", "Aougrout", "Talmine", "Bordj Badji Mokhtar", "Sebaa", "Ouled Aïssa"],
    Chlef: ["Chlef", "Ténès", "Benairia", "El Karimia", "Tadjena", "Taougrite", "Beni Haoua", "Sobha", "Harchoun", "Ouled Fares", "Sidi Akkacha", "Boukadir", "Beni Rached", "Talassa", "Herenfa", "Oued Goussine", "Dahra", "Ouled Abbes", "Sendjas", "Zeboudja", "Oued Sly", "Abou El Hassan", "El Marsa", "Chettia", "Sidi Abderrahmane", "Moussadek", "El Hadjadj", "Labiod Medjadja", "Oued Fodda", "Ouled Ben Abdelkader", "Bouzghaia", "Aïn Merane", "Oum Drou", "Breira", "Beni Bouateb"],
    Laghouat: ["Laghouat", "Ksar El Hirane", "Bennasser Benchohra", "Sidi Makhlouf", "Hassi Delaa", "Hassi R'Mel", "Aïn Madhi", "Tadjemout", "Kheneg", "Gueltat Sidi Saad", "Aïn Mahdi", "Tadjrouna", "Aflou", "El Ghicha", "Beidha", "Brida", "El Assafia", "Oued Morra", "Oued M'Zi", "El Houaita", "Taouiala", "Sidi Bouzid"],
    "Oum El Bouaghi": ["Oum El Bouaghi", "Aïn Beïda", "Aïn M'lila", "Behir Chergui", "El Amiria", "Sigus", "El Belala", "Aïn Babouche", "Berriche", "Ouled Hamla", "Dhalaa", "Aïn Kercha", "Hanchir Toumghani", "El Djazia", "Aïn Diss", "Fkirina", "Souk Naamane", "Zorg", "El Fedjoudj Boughrara Saoudi", "Ouled Zouai", "Bir Chouhada", "Ksar Sbahi", "Oued Nini", "Meskiana", "Aïn Fekroune", "Rahia", "Aïn Zitoun", "Ouled Gacem", "El Harmilia"],
    Batna: ["Batna", "Ghassira", "Maafa", "Merouana", "Seriana", "Menaa", "El Madher", "Tazoult", "N'Gaous", "Guigba", "Inoughissen", "Ouyoun El Assafir", "Djerma", "Bitam", "Abdelkader Azil", "Arris", "Kimmel", "Tilatou", "Aïn Djasser", "Ouled Selam", "Tigherghar", "Aïn Yagout", "Fesdis", "Sefiane", "Rahbat", "Tighanimine", "Lemsane", "Ksar Belezma", "Seggana", "Ichmoul", "Foum Toub", "Bouzina", "Chemora", "Oued El Ma", "Talkhamt", "Beni Foudhala El Hakania", "Oued Chaaba", "Taxlent", "Gosbat", "Ouled Aouf", "Boumagueur", "Barika", "Djezzar", "T'Kout", "Aïn Touta", "Hidoussa", "Teniet El Abed", "Oued Taga", "Ouled Fadel", "Timgad", "Ras El Aioun", "Chir", "Ouled Si Slimane", "Zanat El Beida", "M'Doukal", "Ouled Ammar", "El Hassi", "Lazrou", "Boumia", "Boulhilat", "Larbaâ"],
    Béjaïa: ["Béjaïa", "Amizour", "Ferraoun", "Taourirt Ighil", "Chellata", "Tamokra", "Timezrit", "Souk El Tenine", "M'Cisna", "Tinebdar", "Tichy", "Semaoun", "Kendira", "Tifra", "Ighram", "Amalou", "Ighil Ali", "Fenaia Ilmaten", "Toudja", "Darguina", "Sidi Ayad", "Aokas", "Beni Djellil", "Adekar", "Akbou", "Seddouk", "Tazmalt", "Aït Rizine", "Chemini", "Souk Oufella", "Taskriout", "Tibane", "Tala Hamza", "Barbacha", "Beni Ksila", "Ouzellaguen", "Bouhamza", "Aït Smail", "Boukhelifa", "Tizi N'Berber", "Beni Melikeche", "Sidi Aïch", "El Kseur", "Melbou", "Akfadou", "Leflaye", "Kherrata", "Draâ El Kaïd", "Tamridjet", "Aït Oumalou", "Ouzellaguene", "Beni Maouche"],
    Biskra: ["Biskra", "Ouled Djellal", "Sidi Okba", "Sidi Khaled", "El Kantara", "Aïn Zaatout", "Zeribet El Oued", "El Feidh", "El Outaya", "Djemorah", "Tolga", "Lioua", "Lichana", "Ourlal", "M'Lili", "Foughala", "Bordj Ben Azzouz", "Meziraa", "Bouchagroune", "Mekhadma", "El Hadjeb", "Chaïba", "Besbes", "Ech Chaïba", "Ouled Sidi Brahim", "Ras El Miaad", "Sidi Khaled", "Chetma", "El Ghrous", "El Haouch", "Aïn Naga", "Zeribet El Oued", "El Mizaraa"],
    Béchar: ["Béchar", "Erg Ferradj", "Ouled Khoudir", "Meridja", "Timoudi", "Lahmar", "Béni Ounif", "Taghit", "El Ouata", "Boukais", "Mogheul", "Abadla", "Kerzaz", "Ksabi", "Tabesbest", "Béni Ikhlef", "Tamtert", "Beni Ounif", "Kenadsa", "Igli"],
    Blida: ["Blida", "Chréa", "Boufarik", "Oued El Alleug", "Ouled Yaïch", "Chebli", "Bouinan", "Soumaa", "Mouzaia", "Hammam Melouane", "Aïn Romana", "Bouarfa", "Beni Tamou", "Beni Mered", "Larbaa", "Oued Djer", "Bougara", "Ben Khellil", "Souhane", "Meftah", "Ouled Slama", "Chiffa", "Aïn Lechiakh", "Djebabra", "Guerrouaou"],
    Bouira: ["Bouira", "El Asnam", "Guerrouma", "Souk El Had", "Kadiria", "Hanif", "Dirah", "Aïn Bessem", "Bir Ghbalou", "Khabouzia", "Ahl El Ksar", "Bouderbala", "Zbarbar", "Aïn El Hadjar", "Djebahia", "Aomar", "Chorfa", "Kadiria", "Bechloul", "Boukram", "Aghbalou", "Lakhdaria", "Maala", "El Hachimia", "Aïn Laloui", "Aïn Turk", "Ouled Rached", "Ridane", "Taghzout", "Sour El Ghozlane", "Aït Laziz", "Haïzer", "Taguedit", "Raffour", "Dechmia", "Saharidj", "Ath Mansour Taourirt", "Raouraoua", "M'Chedallah", "Chorfa", "El Adjiba", "El Hakimia", "El Mokrani", "Bordj Okhriss", "Hadjera Zerga"],
    Tamanrasset: ["Tamanrasset", "Abalessa", "In Ghar", "In Guezzam", "In Salah", "Tazrouk", "Tin Zaouatine", "Idles", "In Amguel", "Foggaret Ezzaouia"],
    Tébessa: ["Tébessa", "Bir El Ater", "Cheria", "Stah Guentis", "El Aouinet", "Lahouidjbet", "Safsaf El Ouesra", "Hammamet", "Negrine", "Bir Mokadem", "El Kouif", "Morsott", "El Ogla", "Bir Dheheb", "El Ogla El Malha", "Guorriguer", "Bekkaria", "Boukhadra", "Ouenza", "El Ma Labiod", "Tlidjene", "Aïn Zerga", "El Meridj", "Boulhaf Dyr", "Bedjene", "El Mezeraa", "Ferkane"],
    Tlemcen: ["Tlemcen", "Bensekrane", "Bab El Assa", "Remchi", "Aïn Tallout", "Souani", "Bouhlou", "Ain Fezza", "Ouled Mimoun", "Amieur", "Aïn Youcef", "Zenata", "Beni Snous", "Beni Boussaid", "Marsa Ben M'Hidi", "Nedroma", "Sidi Djillali", "Beni Bahdel", "El Gor", "Fellaoucene", "Azails", "Sebbaa Chioukh", "Terni Beni Hediel", "Aïn Nehala", "Hennaya", "Ghazaouet", "Souahlia", "Msirda Fouaga", "Aïn Fetah", "El Aricha", "Souk Thlata", "Sidi Abdelli", "Sebra", "Beni Ouarsous", "Beni Khellad", "Sidi Medjahed", "Beni Semiel", "Aïn Ghoraba", "Chetouane", "Mansourah", "Beni Mester", "Maghnia", "Hammam Boughrara", "Dar Yaghmouracene", "Sabra", "Djebala", "El Fehoul", "Ain Kebira", "Tianet"],
    Tiaret: ["Tiaret", "Medroussa", "Aïn Bouchekif", "Sidi Ali Mellal", "Aïn Zarit", "Aïn Deheb", "Sidi Bakhti", "Medrissa", "Zmalet El Emir Abdelkader", "Madna", "Sebt", "Mellakou", "Dahmouni", "Rahouia", "Mahdia", "Sougueur", "Sidi Abderrahmane", "Djillali Ben Amar", "Ain El Hadid", "Ouchtiata Moukhatir", "Sidi Hosni", "Djebel Messaad", "Sebaine", "Tousnina", "Frenda", "Ain Kermes", "Ksar Chellala", "Rechaiga", "Nadorah", "Tagdemt", "Oued Lilli", "Mechraa Safa", "Hamadia", "Chehaima", "Takhemaret", "Sidi Abdelghani", "Serghine", "Bougara", "Faidja"],
    "Tizi Ouzou": ["Tizi Ouzou", "Ain El Hammam", "Akbil", "Freha", "Souamaâ", "Mechtras", "Irdjen", "Timizart", "Makouda", "Draâ El Mizan", "Tizi Gheniff", "Bounouh", "Aït Chafâa", "Frikat", "Beni Aïssi", "Beni Zmenzer", "Iferhounène", "Azazga", "Illoula Oumalou", "Yakouren", "Larbaâ Nath Irathen", "Tizi Rached", "Zekri", "Ouaguenoun", "Aïn Zaouia", "M'Kira", "Aït Yahia", "Aït Mahmoud", "Maâtkas", "Aït Boumahdi", "Abi Youcef", "Beni Douala", "Illilten", "Bouzeguène", "Aït Aggouacha", "Ouadhia", "Azeffoun", "Tigzirt", "Djemaâ Saharidj", "Iflissen", "Boudjima", "Tirmitine", "Akerrou", "Yatafen", "Beni Ziki", "Draâ Ben Khedda", "Ouacif", "Idjeur", "Mekla", "Tizi N'Tleta", "Beni Yenni", "Aghribs", "Imsouhal", "Tadmaït", "Aït Oumalou", "Souk El Tenine", "Aït Khelili", "Sidi Naamane", "Iboudraren", "Aghni Goughran", "Mizrana", "Ait Boumahdi", "Abi Youcef"],
    Alger: ["Alger Centre", "Sidi M'Hamed", "El Madania", "Hamma El Annasser", "Bab El Oued", "Bologhine", "Casbah", "Oued Koriche", "Bir Mourad Raïs", "El Biar", "Bouzareah", "Birkhadem", "El Harrach", "Baraki", "Oued Smar", "Bourouba", "Hussein Dey", "Kouba", "Bachdjerrah", "Dar El Beïda", "Bab Ezzouar", "Ben Aknoun", "Dely Ibrahim", "Hammamet", "Raïs Hamidou", "Djasr Kasentina", "El Mouradia", "Hydra", "Mohammadia", "Bordj El Kiffan", "El Magharia", "Beni Messous", "Les Eucalyptus", "Birtouta", "Tessala El Merdja", "Ouled Chebel", "Sidi Moussa", "Aïn Taya", "Bordj El Bahri", "Marsa", "Heraoua", "Rouiba", "Reghaïa", "Aïn Benian", "Staoueli", "Zeralda", "Mahelma", "Rahmania", "Souidania", "Cheraga", "Ouled Fayet", "El Achour", "Draria", "Douera", "Baba Hassen", "Khraissia", "Saoula"],
    Djelfa: ["Djelfa", "Moudjbara", "El Guedid", "Hassi Bahbah", "Aïn Oussera", "Messaad", "Birine", "Tadmit", "Charef", "El Idrissia", "Douis", "Hassi El Euch", "Guettara", "Aïn El Ibel", "Sidi Baizid", "Mliliha", "El Khemis", "Sidi Ladjel", "Hassi Fedoul", "Benhar", "Dar Chioukh", "Zaafrane", "Deldoul", "Faidh El Botma", "Bouira Lahdab", "Zaccar", "Ain Maabed", "Benyagoub", "Sed Rahal", "Oum Laadham", "Aïn Chouhada", "Guernini", "Selmana", "Amourah", "Ain Fekka", "Guettara"],
    Jijel: ["Jijel", "Erraguène", "El Aouana", "Ziama Mansouriah", "Taher", "Emir Abdelkader", "Chekfa", "Chahna", "El Milia", "Sidi Marouf", "Settara", "El Ancer", "Sidi Abdelaziz", "Kaous", "Ghebala", "Bouraoui Belhadef", "Djimla", "Selma Benziada", "Boussif Ouled Askeur", "El Kennar Nouchfi", "Ouled Yahia Khadrouche", "Boudriaa Ben Yadjis", "Djemaa Beni Habibi", "Bordj T'har", "Ouled Rabah", "Ouadjana", "Texenna", "Sidi Maarouf"],
    Sétif: ["Sétif", "Aïn El Kebira", "Beni Aziz", "Ouled Sidi Ahmed", "Boutaleb", "Aïn Roua", "Draa Kebila", "Bir El Arch", "Beni Chebana", "Ouled Tebben", "Hamma", "Maoklane", "Aïn Legraj", "Aïn Abessa", "Dehamcha", "Babor", "Guidjel", "Aïn Lahdjar", "Bousselam", "Ouled Addouane", "Beni Fouda", "Tachouda", "Beni Mouhli", "Ouled Sabor", "Guenzet", "Mezloug", "Beidha Bordj", "El Ouricia", "Tizi N'Bechar", "Salah Bey", "Aïn Azal", "Guellal", "Aïn Arnat", "Amoucha", "Aïn Oulmene", "Beni Ouartilene", "Rosfa", "Kasr El Abtal", "Bougaa", "Bordj Ghedir", "El Eulma", "Djemila", "Bir Haddada", "Serdj El Ghoul", "Harbil", "El Ouldja", "Talaifacene", "Guelta Zerka", "Oued El Barad", "Taya", "Bouandas", "Bazer Sakhra", "Hammam Sokhna", "Ain Legradj", "Maouia", "Hammam Guergour", "Ait Naoual Mezada", "Ait Tizi", "Bousselam", "Ouled Si Ahmed"],
    Saïda: ["Saïda", "Doui Thabet", "Ain El Hadjar", "Ouled Khaled", "Moulay Larbi", "Youb", "Hounet", "Sidi Amar", "Sidi Boubekeur", "El Hassasna", "Maamora", "Sidi Ahmed", "Ain Soltane", "Ouled Brahim", "Tircine", "Ain Sekhouna"],
    Skikda: ["Skikda", "Azzaba", "Djendel Saadi Mohamed", "Ain Zouit", "El Hadaiek", "Sidi Mezghiche", "Emdjez Edchich", "Beni Zid", "El Ghedir", "Bouchtata", "Ouled Attia", "Oued Zehour", "Collo", "Beni Bachir", "Salah Bouchaour", "Cheraia", "Zerdazas", "Ouled Hebaba", "Beni Oulbane", "Ain Bouziane", "Ramdane Djamel", "Essebt", "Oum Toub", "Ain Charchar", "El Marsa", "Ben Azzouz", "Ain Kechra", "Ouldja Boulbalout", "Kanoua", "El Harrouch", "Tamalous", "Fil Fila", "Zitouna", "El Ghedir", "Bouchtata", "Ouled Attia", "Filfila", "Hammadi Krouma"],
    "Sidi Bel Abbès": ["Sidi Bel Abbès", "Tessala", "Sidi Brahim", "Mostefa Ben Brahim", "Telagh", "Mezaourou", "Boukhanafis", "Sidi Ali Boussidi", "Badredine El Mokrani", "Marhoum", "Tafissour", "Amarnas", "Tilmouni", "Sidi Lahcene", "Ain El Berd", "Sfissef", "Ain Thrid", "Merine", "Ras El Ma", "Sidi Khaled", "Bir El Hammam", "Sidi Ali Benyoub", "Sidi Yacoub", "Tenira", "Moulay Slissen", "El Hacaiba", "Hassi Zahana", "Tabia", "Sidi Chaib", "Ain Tindamine", "Lamtar", "Sidi Hamadouche", "Belarbi", "Ain Adden", "Ain Kada", "Benachiba Chelia", "Hassi Dahou", "Oued Sefioun", "Redjem Demouche", "Sidi Yacine", "Zerouala", "Oued Taourira", "Bir El Hammam", "Sidi Khaled", "Sidi Lahcene", "Aïn Thrid", "Telagh", "Ben Badis", "Marhoum", "Sidi Ali Boussidi", "Hassi Zehana", "Tabia"],
    Annaba: ["Annaba", "Berrahal", "El Hadjar", "Oued El Aneb", "Sidi Amar", "Seraïdi", "Aïn Berda", "Chetaïbi", "Treat", "El Bouni", "Eulma", "Cheurfa"],
    Guelma: ["Guelma", "Nechmaya", "Bouati Mahmoud", "Oued Zenati", "Tamlouka", "Oued Fragha", "Aïn Sandel", "Ras El Agba", "Dahouara", "Belkheir", "Ben Djerrah", "Bou Hamdane", "Aïn Ben Beida", "Khezara", "Bouchegouf", "Héliopolis", "Aïn Makhlouf", "Hammam Debagh", "Roknia", "Bordj Sabath", "Hammam N'Bails", "Houari Boumediene", "Medjez Amar", "Bou Hachana", "El Fedjoudj", "Medjez Sfa", "Djeballah Khemissi", "Beni Mezline", "Boumahra Ahmed", "Sellaoua Announa", "Belkhir", "Bendjerrah", "Bouati Mahmoud", "Nechmaya"],
    Constantine: ["Constantine", "Hamma Bouziane", "Didouche Mourad", "El Khroub", "Aïn Smara", "Zighoud Youcef", "Ouled Rahmoune", "Beni Hamiden", "Aïn Abid", "Ibn Ziad", "Messaoud Boudjeriou", "Ben Badis"],
    Médéa: ["Médéa", "Berrouaghia", "Tablat", "Ksar El Boukhari", "Benchicao", "El Omaria", "Ouled Antar", "Seghouane", "Aïn Boucif", "Ouled Bouachra", "Beni Slimane", "El Guelb El Kebir", "Souagui", "Tizi Mahdi", "Si Mahdjoub", "Bouchrahil", "Oued Harbil", "Ouzera", "Aïn Ouksir", "Chahbounia", "Aïssaouia", "Cheniguel", "Djouab", "El Azizia", "El Hamdania", "Tafraout", "Aziz", "Derrag", "Boghar", "Sidi Ziane", "Sidi Errabia", "Deux Bassins", "Mezerana", "Mihoub", "Maghraoua", "Ouled Maaref", "Sedraya", "Sidi Damed", "Sidi Zahar", "Zoubiria", "Ouled Deide", "Ouled Hellal", "Tamesguida", "El Guelbelkebir", "Chellalet El Adhaoura", "Kef Lakhdar", "Baata", "Tlatet Eddouar", "Sidi Naamane", "Ouled Brahim", "Rebaia", "Bouskene", "Meftaha", "Medjebar", "Oum El Djalil", "Ouamri", "Hannacha", "Tamesguida", "El Omaria", "Ouled Antar", "Seghouane", "Benchicao", "Beni Slimane", "Chahbounia"],
    Mostaganem: ["Mostaganem", "Aïn Tédles", "Hassi Maameche", "Fornaka", "Stidia", "Aïn Nouissy", "Kheir Eddine", "Sidi Ali", "Aïn Boudinar", "Bouguirat", "Mesra", "Mansourah", "Abdelmalek Ramdane", "Safsaf", "Sidi Lakhdar", "Achaacha", "Khadra", "Nekmaria", "Sidi Belattar", "Oued El Kheir", "El Hassiane", "Ain Sidi Cherif", "Tazgait", "Sour", "Ouled Maallah", "Hadjadj", "Ouled Boughalem", "Sayada", "Mezghrane", "Touahria", "Sirat", "Fornaka"],
    "M'Sila": ["M'Sila", "Maadid", "Magra", "Hammam Dhalaâ", "Ouled Derradj", "Tarmount", "Mtarfa", "Khoubana", "Mcif", "Chellal", "Ouled Madhi", "Ouled Addi Guebala", "Belaiba", "Sidi Aissa", "Aïn El Hadjel", "Aïn El Melh", "Bou Saâda", "Ouled Sidi Brahim", "Sidi Ameur", "Tamsa", "Ben Srour", "Ouanougha", "Berhoum", "Aïn Errich", "Beni Ilmane", "Ouled Atia", "Khettouti Sed Djir", "Zarzour", "Mohamed Boudiaf", "Dehahna", "Bouti Sayah", "Aïn Fares", "Sidi Hadjeres", "Medjedel", "Slim", "Aïn Khadra", "Ouled Mansour", "Maârif", "Djebel Messaad", "Oultene", "Tarmount", "Menaa", "Magra", "Hammam Dhalaâ", "Khoubana", "Chellal", "Ouled Madhi"],
    Mascara: ["Mascara", "Bou Hanifia", "Tizi", "Ain Fares", "Ghriss", "Froha", "Matemore", "Makda", "Sidi Kada", "Zelmata", "Oued El Abtal", "Ain Ferah", "Sig", "Oggaz", "Hacine", "Alaimia", "Mohammadia", "Sidi Boussaid", "El Bordj", "El Menaouer", "Oued Taria", "Aïn Fekan", "Gharrous", "Mamounia", "Aouf", "Guerdjoum", "Chorfa", "Sidi Abdelmoumene", "Ferraguig", "El Ghomri", "Sedjerara", "Moctadouz", "Benian", "Khalouia", "El Hachem", "Sidi Abdeldjebar", "Nesmoth", "Sehailia", "Ras Ain Amirouche", "Tighennif", "Zahana", "El Gaada", "El Keurt", "Gharrous", "Ain Fares", "El Bordj", "Aouf"],
    Ouargla: ["Ouargla", "Aïn Beida", "N'Goussa", "Hassi Messaoud", "Rouissat", "Sidi Khouiled", "Hassi Ben Abdellah", "Touggourt", "Nezla", "Zaouia El Abidia", "El Alia", "Tebesbest", "Taibet", "Blidet Amor", "Megarine", "Djamaa", "El Hadjira", "Tenedla", "Tamacine", "Benaceur", "M'Naguer"],
    Oran: ["Oran", "Bir El Djir", "Es Senia", "Arzew", "Bethioua", "Marsat El Hadjadj", "Aïn El Turck", "El Ançor", "Oued Tlélat", "Tafraoui", "Sidi Chami", "Boufatis", "Mers El Kebir", "Bousfer", "El Karma", "Aïn El Kerma", "Aïn El Bia", "Hassi Bounif", "Hassi Ben Okba", "El Braya", "Hassi Mefsoukh", "Sidi Ben Yebka", "Messerghin", "Boutlelis", "Aïn Kerma", "El Ancor"],
    "El Bayadh": ["El Bayadh", "Rogassa", "Stitten", "Brezina", "Ghassoul", "Boualem", "El Abiodh Sidi Cheikh", "Ain El Orak", "Arbaouat", "Bougtoub", "El Kheiter", "Kef El Ahmar", "Boussemghoun", "Chellala", "El Bnoud", "El Mehara", "Tousmouline", "Sidi Ameur", "El Aouedj", "Cheguig", "Kraakda", "El Biodh Sidi Cheikh"],
    Illizi: ["Illizi", "Djanet", "In Amenas", "Debdeb", "Bordj Omar Driss", "Bordj El Haouass"],
    "Bordj Bou Arreridj": ["Bordj Bou Arreridj", "Aïn Taghrout", "Bordj Ghedir", "Sidi Embarek", "El Achir", "Aïn Tesra", "Bir Kasdali", "Ras El Oued", "Bordj Zemoura", "Medjana", "Teniet En Nasr", "Djaafra", "El Hamadia", "Mansourah", "El Main", "El Ach", "Ouled Brahem", "Ouled Dahmane", "Haraza", "Ghilassa", "Rabta", "El Mehir", "Hasnaoua", "Khelil", "Taglait", "Ksour", "Ouled Sidi Brahim", "Tixter", "Colla", "El Anseur", "Belimour", "Tassameurt", "Bordj Zemmoura", "Ben Daoud"],
    Boumerdès: ["Boumerdès", "Boudouaou", "Reghaïa", "Thenia", "Tidjelabine", "Zemmouri", "Si Mustapha", "Corso", "Ouled Moussa", "Larbatache", "Bouzegza Keddara", "Naciria", "Djinet", "Issers", "Khemis El Khechna", "Dellys", "Ammal", "Beni Amrane", "Souk El Had", "Boudouaou El Bahri", "Ouled Aïssa", "Leghata", "Afir", "Timezrit", "Bordj Menaïel", "Baghlia", "Sidi Daoud", "Ouled Hedadj", "Hammedi", "Chabet El Ameur", "Taourga", "Cap Djinet"],
    "El Tarf": ["El Tarf", "Bouhadjar", "Ben M'Hidi", "Bougous", "El Kala", "Aïn El Assel", "El Aioun", "Bouteldja", "Besbes", "Asfour", "Echatt", "Zerizer", "Zitouna", "Ain Kerma", "Oued Zitoun", "Hammam Beni Salah", "Raml Souk", "Chihani", "Drean", "Chbaita Mokhtar", "Berrihane", "Lac des Oiseaux", "Souarekh", "Chefia"],
    Tindouf: ["Tindouf", "Oum El Assel"],
    Tissemsilt: ["Tissemsilt", "Bordj Bounaama", "Theniet El Had", "Lazharia", "Beni Chaib", "Lardjem", "Melaab", "Sidi Lantri", "Bordj El Emir Abdelkader", "Layoune", "Khemisti", "Ouled Bessem", "Ammari", "Youssoufia", "Sidi Boutouchent", "Larbaa", "Maasem", "Sidi Abed", "Tamalaht", "Sidi Slimane", "Boucaid", "Lardjam"],
    "El Oued": ["El Oued", "Robbah", "Oued El Alenda", "Bayadha", "Nakhla", "Guemar", "Kouinine", "Reguiba", "Hamraia", "Taghzout", "Debila", "Hassani Abdelkrim", "Hassi Khalifa", "Taleb Larbi", "Douar El Ma", "Sidi Aoun", "Trifaoui", "Magrane", "Beni Guecha", "Ourmes", "Still", "Mih Ouansa", "El Ogla", "Sidi Khellil", "Tendla", "Mrara", "Messaad", "Oum Touyour", "Sidi Amrane", "Djamaa"],
    Khenchela: ["Khenchela", "Mtoussa", "Kais", "Baghai", "El Hamma", "Aïn Touila", "Taouzient", "Bouhmama", "El Oueldja", "Remila", "Cherchar", "Djellal", "Babar", "Tamza", "Ensigha", "Ouled Rechache", "El Mahmal", "Msara", "Yabous", "Khirane", "Chelia"],
    "Souk Ahras": ["Souk Ahras", "Sedrata", "Hanancha", "Mechroha", "Ouled Driss", "Tiffech", "Zaarouria", "Taoura", "Drea", "Heddada", "Khemissa", "Oum El Adhaim", "Aïn Zana", "Aïn Soltane", "Ouled Moumen", "Bir Bouhouche", "Merahna", "Ouillen", "Sidi Fredj", "Safel El Ouiden", "Ragouba", "Khedara", "Terraguelt", "Zouabi", "Oued Keberit", "Mdaourouche"],
    Tipaza: ["Tipaza", "Cherchell", "Damous", "Merad", "Hadjout", "Kolea", "Attatba", "Sidi Amar", "Gouraya", "Menaceur", "Larhat", "Aghbal", "Bouharoun", "Ahmer El Ain", "Chaiba", "Douaouda", "Bourkika", "Khemisti", "Sidi Ghiles", "Messelmoun", "Sidi Rached", "Sidi Semiane", "Beni Milleuk", "Hadjeret Ennous", "Sidi Amar", "Fouka", "Bou Ismail", "Nador"],
    Mila: ["Mila", "Ferdjioua", "Chelghoum Laïd", "Oued Athmania", "Aïn Mellouk", "Telerghma", "Oued Seguen", "Tadjenanet", "Benyahia Abderrahmane", "Sidi Merouane", "Ahmed Rachedi", "Ouled Khalouf", "Ain Beida Harriche", "Minar Zarza", "Amira Arres", "Terrai Bainen", "Grarem Gouga", "Rouached", "Tiberguent", "Bouhatem", "Hamala", "Aïn Tine", "El Mechira", "Sidi Khelifa", "Zeghaia", "Elayadi Barbes", "Yahia Beniguecha", "Chigara", "Tassadane Haddada", "Derradji Bousselah", "Ouled Hamla", "Teleghma"],
    "Aïn Defla": ["Aïn Defla", "Khemis Miliana", "Rouina", "Djendel", "El Attaf", "El Abadia", "Miliana", "Arib", "Djelida", "El Amra", "Boumedfaa", "Hammam Righa", "Aïn Lechiakh", "Oued Chorfa", "Aïn Torki", "Mekhatria", "Birbouche", "Bathia", "Tacheta Zegagha", "Djemaa Ouled Chikh", "Ain Benian", "Hoceinia", "Barbouche", "Bir Ould Khelifa", "Bordj Emir Khaled", "Zeddine", "El Hassania", "Tiberkanine", "Ain Bouyahia", "El Maine", "Tarik Ibn Ziad", "Bourached", "Ain Soltane", "Oued Djemaa", "Hammam Righa", "El Attaf"],
    Naâma: ["Naâma", "Mecheria", "Aïn Sefra", "Tiout", "Sfissifa", "Moghrar", "Assela", "Djeniene Bourezg", "Aïn Ben Khelil", "Makman Ben Amer", "Kasdir", "El Biod"],
    "Aïn Témouchent": ["Aïn Témouchent", "Chaabet El Leham", "Aïn Kihal", "Hammam Bouhadjar", "Bou Zedjar", "Oued Berkeche", "Aghlal", "Terga", "Aïn El Arbaa", "Tamzoura", "Chentouf", "Sidi Ben Adda", "Aoubellil", "El Malah", "Sidi Boumediene", "Oued Sabah", "Ouled Boudjemaa", "Aïn Tolba", "El Amria", "Hassi El Ghella", "Hassasna", "Ouled Kihel", "Beni Saf", "Sidi Safi", "Oulhaca El Gheraba", "Tadmaya", "El Emir Abdelkader", "El Messaid"],
    Ghardaïa: ["Ghardaïa", "El Meniaa", "Dhayet Bendhahoua", "Berriane", "Metlili", "El Atteuf", "Zelfana", "Sebseb", "Bounoura", "Hassi Fehal", "Hassi Gara", "Mansoura", "Guerrara"],
    Relizane: ["Relizane", "Oued Rhiou", "Belhacel", "Mazouna", "Zemmoura", "Sidi M'Hamed Benali", "Ouled Aïche", "El Matmar", "Sidi Lazreg", "El Hamadna", "Aïn Tarek", "Oued Essalm", "Ouarizane", "Kalaa", "Yellel", "Sidi Khettab", "Ammi Moussa", "Beni Dergoun", "Djidiouia", "Mendes", "Lahlef", "Sidi Saada", "Ouled Sidi Mihoub", "Aïn Rahma", "Oued El Djemaa", "Ramka", "Souk El Had", "Dar Ben Abdellah", "El Guettar", "Hamri", "El Hassi", "El Matmar", "Mediouna", "Beni Zentis", "Oued Rhiou", "Djidiouia", "Yellel", "Zemmoura"],
    Timimoun: ["Timimoun", "Charouine", "Deldoul", "Ouled Said", "Tinerkouk", "Talmine", "Metarfa", "Ouled Aissa"],
    "Bordj Badji Mokhtar": ["Bordj Badji Mokhtar", "Timiaouine"],
    "Ouled Djellal": ["Ouled Djellal", "Ras El Miaad", "Besbes", "Doucen", "Chaiba"],
    "Béni Abbès": ["Béni Abbès", "El Ouata", "Tabelbala", "Igli", "Timoudi", "Kerzaz", "Ouled Khodeir", "Ksabi", "Tamtert", "Béni Ikhlef"],
    "In Salah": ["In Salah", "Foggaret Ezzaouia", "In Ghar"],
    "In Guezzam": ["In Guezzam", "Tin Zaouatine"],
    Touggourt: ["Touggourt", "Tebesbest", "Nezla", "Zaouia El Abidia", "Taibet", "Benaceur", "Mnaguer", "Megarine", "Sidi Slimane", "Tamacine", "Blidet Amor"],
    Djanet: ["Djanet", "Bordj El Haouass"],
    "El M'Ghair": ["El M'Ghair", "Djamaa", "Sidi Amrane", "Oum Touyour", "Sidi Khellil", "Still", "Tenedla", "Merara"],
    "El Menia": ["El Menia", "Hassi Gara", "Hassi Fehal", "Mansoura"],
}

export type AlgeriaWilaya = (typeof ALGERIA_WILAYAS)[number]

/**
 * Get communes for a specific wilaya
 */
export function getCommunesByWilaya(wilaya: string): string[] {
    return ALGERIA_COMMUNES[wilaya] || []
}

/**
 * Check if a wilaya exists
 */
export function isValidWilaya(wilaya: string): boolean {
    return ALGERIA_WILAYAS.includes(wilaya as AlgeriaWilaya)
}

/**
 * Check if a commune exists in a wilaya
 */
export function isValidCommune(wilaya: string, commune: string): boolean {
    const communes = getCommunesByWilaya(wilaya)
    return communes.includes(commune)
}
