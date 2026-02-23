import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Hotel from '#models/hotel'

export default class HotelSeeder extends BaseSeeder {
  async run() {
    await Hotel.updateOrCreateMany('name', [
      {
        name: 'Le Grand Paris',
        location: 'Paris, France',
        description:
          'Situé au cœur de Paris avec vue sur la Tour Eiffel, Le Grand Paris offre un séjour luxueux avec spa, restaurant gastronomique et service de conciergerie 24h/24.',
        pictureList: [
          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        ],
      },
      {
        name: 'Akkor Palace',
        location: 'Nice, France',
        description:
          "Palace 5 étoiles sur la Promenade des Anglais. Piscine à débordement, plage privée et vue panoramique sur la Méditerranée. L'excellence de la Riviera.",
        pictureList: [
          'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
        ],
      },
      {
        name: 'Mountain Lodge',
        location: 'Chamonix, France',
        description:
          'Chalet de montagne authentique face au Mont-Blanc. Idéal pour les amateurs de ski en hiver et de randonnée en été. Sauna et jacuzzi avec vue sur les Alpes.',
        pictureList: ['https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=800'],
      },
      {
        name: 'The London Royal',
        location: 'London, United Kingdom',
        description:
          'Hôtel historique dans le quartier de Westminster. Chambres élégantes de style victorien, afternoon tea traditionnel et proximité immédiate de Big Ben.',
        pictureList: [
          'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800',
          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
        ],
      },
      {
        name: 'Barcelona Beach Resort',
        location: 'Barcelona, Spain',
        description:
          'Resort moderne en bord de mer sur la Barceloneta. Rooftop bar, piscine sur le toit et accès direct à la plage. À deux pas de La Rambla et du quartier gothique.',
        pictureList: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'],
      },
      {
        name: 'Amsterdam Canal House',
        location: 'Amsterdam, Netherlands',
        description:
          'Boutique hôtel dans une maison de canal du XVIIe siècle. Décoration design, petit-déjeuner bio et vélos mis à disposition pour explorer la ville. Au cœur du Jordaan.',
        pictureList: ['https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800'],
      },
      {
        name: 'Roma Antica',
        location: 'Rome, Italy',
        description:
          "Hôtel de charme à deux pas du Colisée. Terrasse panoramique avec vue sur les toits de Rome, cuisine italienne raffinée et cave à vins d'exception.",
        pictureList: [
          'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800',
          'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
        ],
      },
      {
        name: 'Berlin Mitte Hotel',
        location: 'Berlin, Germany',
        description:
          "Hôtel contemporain au cœur de Berlin-Mitte. Architecture Bauhaus, galerie d'art intégrée et restaurant fusion. Proche de la Porte de Brandebourg et de Museum Island.",
        pictureList: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800'],
      },
      {
        name: 'Santorini Sunset Villa',
        location: 'Santorini, Greece',
        description:
          "Villa de luxe perchée sur les falaises d'Oia avec vue imprenable sur le coucher de soleil. Piscine privée, cave à vin et transfert en bateau inclus.",
        pictureList: [
          'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800',
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        ],
      },
      {
        name: 'Tokyo Sky Tower Hotel',
        location: 'Tokyo, Japan',
        description:
          'Hôtel futuriste dans le quartier de Shinjuku. Chambres avec vue sur le mont Fuji, onsen traditionnel au dernier étage et restaurant étoilé Michelin.',
        pictureList: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'],
      },
      {
        name: 'New York Central Park Hotel',
        location: 'New York, USA',
        description:
          'Hôtel iconique sur la 5ème Avenue face à Central Park. Suites spacieuses, bar rooftop avec skyline de Manhattan et spa urbain haut de gamme.',
        pictureList: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
        ],
      },
      {
        name: 'Dubai Marina Luxury',
        location: 'Dubai, UAE',
        description:
          'Resort ultra-luxe sur la Marina de Dubaï. Suite avec piscine privée, butler personnel, accès au yacht club et vue spectaculaire sur Palm Jumeirah.',
        pictureList: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'],
      },
    ])
  }
}
