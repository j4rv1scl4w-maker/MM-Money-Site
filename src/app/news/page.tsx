'use client';
import { useState } from 'react';
import Image from 'next/image';
import Banknote from '@/components/Banknote';

interface Emission {
  id: string;
  year: number;
  date: string;
  country: string;
  issuer: string;
  title: string;
  description: string;
  hue: number;
  imageUrl?: string;
}

const EMISSIONS: Emission[] = [
  {
    id: 'e1',
    year: 2025,
    date: 'Jan 2025',
    country: 'Egypt',
    issuer: 'Central Bank of Egypt',
    title: '10 Pounds',
    description: 'The front shows Al-Rifai Mosque in Cairo with Pharaoh Khafre. This is the 2025-issued variant of the long-running P-73 type with the 2022–2026 signature period.',
    hue: 40,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/01-egypt-10-pounds-jan-2025.jpg',
  },
  {
    id: 'e2',
    year: 2025,
    date: 'Jan 2025',
    country: 'Poland',
    issuer: 'Narodowy Bank Polski',
    title: '20 Zlotych',
    description: 'The front features Bolesław Chrobry based on a 19th-century etching. It is a commemorative issue for the millennium of his coronation, with details from the Gniezno bronze doors.',
    hue: 215,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/02-poland-20-zlotych-jan-2025.jpg',
  },
  {
    id: 'e3',
    year: 2025,
    date: 'Jan 2025',
    country: 'Fiji',
    issuer: 'Reserve Bank of Fiji',
    title: '100 Cents',
    description: 'The front shows a stylized Chinese dragon with clouds and red lanterns. It is a non-circulating numismatic note for the Chinese Lunar Year of the Dragon.',
    hue: 10,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/03-fiji-100-cents-jan-2025.jpg',
  },
  {
    id: 'e4',
    year: 2025,
    date: 'Feb 2025',
    country: 'Belize',
    issuer: 'Central Bank of Belize',
    title: '2 Dollars',
    description: 'The front shows Philip Goldson with the national coat of arms and Antelope Falls. A distinctive feature is the waterfall theme tied to Belizean natural landmarks.',
    hue: 230,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/04-belize-2-dollars-feb-2025.jpg',
  },
  {
    id: 'e5',
    year: 2025,
    date: 'Feb 2025',
    country: 'Belize',
    issuer: 'Central Bank of Belize',
    title: '5 Dollars',
    description: 'The front shows George Cadle Price with the national coat of arms and the National Assembly building in Belmopan. It is distinguished by the civic and historic architecture references on the note.',
    hue: 0,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/05-belize-5-dollars-feb-2025.jpg',
  },
  {
    id: 'e6',
    year: 2025,
    date: 'Feb 2025',
    country: 'Belize',
    issuer: 'Central Bank of Belize',
    title: '10 Dollars',
    description: 'The front shows Philip Goldson with the national coat of arms and a green heron. Its distinctive theme is Belizean birdlife, echoed by the toucan and hummingbirds referenced on the note.',
    hue: 35,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/06-belize-10-dollars-feb-2025.jpg',
  },
  {
    id: 'e7',
    year: 2025,
    date: 'Feb 2025',
    country: 'Belize',
    issuer: 'Central Bank of Belize',
    title: '20 Dollars',
    description: 'The front shows George Cadle Price with the national coat of arms and Baird\'s tapir. A distinctive element is the wildlife focus, especially the tapir and jaguar imagery.',
    hue: 15,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/07-belize-20-dollars-feb-2025.jpg',
  },
  {
    id: 'e8',
    year: 2025,
    date: 'Feb 2025',
    country: 'Belize',
    issuer: 'Central Bank of Belize',
    title: '50 Dollars',
    description: 'The front shows Philip Goldson with the national coat of arms and the Mask Temple at Lamanai. It is distinguished by its strong Maya archaeological theme.',
    hue: 345,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/08-belize-50-dollars-feb-2025.jpg',
  },
  {
    id: 'e9',
    year: 2025,
    date: 'Feb 2025',
    country: 'Belize',
    issuer: 'Central Bank of Belize',
    title: '100 Dollars',
    description: 'The front shows George Cadle Price with the national coat of arms and a queen triggerfish. A distinctive feature is the marine theme connected to the Great Blue Hole and reef life.',
    hue: 190,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/09-belize-100-dollars-feb-2025.jpg',
  },
  {
    id: 'e10',
    year: 2025,
    date: 'Mar 2025',
    country: 'Mexico',
    issuer: 'Banco de México',
    title: '1,000 Pesos',
    description: 'The front shows Hermila Galindo, Carmen Serdán, and Francisco I. Madero. This commemorative variant adds the "100 Aniversario 1925–2025" overprint for the 100th anniversary of Banco de México.',
    hue: 200,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/10-mexico-1-000-pesos-mar-2025.jpg',
  },
  {
    id: 'e11',
    year: 2025,
    date: 'Mar 2025',
    country: 'Curaçao and Sint Maarten',
    issuer: 'Centrale Bank van Curaçao en Sint Maarten',
    title: '10 Caribbean Guilders',
    description: 'The front shows a gray angelfish and the Klein Curaçao lighthouse. Its distinctive feature is the marine-and-lighthouse identity of the new Caribbean guilder series.',
    hue: 45,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/11-curacao-and-sint-maarten-10-caribbean-guilders-mar-2025.jpg',
  },
  {
    id: 'e12',
    year: 2025,
    date: 'Mar 2025',
    country: 'Curaçao and Sint Maarten',
    issuer: 'Centrale Bank van Curaçao en Sint Maarten',
    title: '20 Caribbean Guilders',
    description: 'The front shows a spotted eagle ray. A distinctive feature is the Sint Maarten coastal setting of Simpson Bay in the new Caribbean guilder series.',
    hue: 195,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/01-curacao-and-sint-maarten-20-caribbean-guilders-mar-2025.jpg',
  },
  {
    id: 'e13',
    year: 2025,
    date: 'Mar 2025',
    country: 'Curaçao and Sint Maarten',
    issuer: 'Centrale Bank van Curaçao en Sint Maarten',
    title: '50 Caribbean Guilders',
    description: 'The front shows a green sea turtle. Its distinctive element is the Curaçao seascape at Grote Knip, reinforcing the marine identity of the series.',
    hue: 130,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/02-curacao-and-sint-maarten-50-caribbean-guilders-mar-2025.jpg',
  },
  {
    id: 'e14',
    year: 2025,
    date: 'Mar 2025',
    country: 'Curaçao and Sint Maarten',
    issuer: 'Centrale Bank van Curaçao en Sint Maarten',
    title: '100 Caribbean Guilders',
    description: 'The front shows a stoplight parrotfish. A distinctive feature is the Court House in Sint Maarten, linking marine life with island civic heritage.',
    hue: 345,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/03-curacao-and-sint-maarten-100-caribbean-guilders-mar-2025.jpg',
  },
  {
    id: 'e15',
    year: 2025,
    date: 'Mar 2025',
    country: 'Curaçao and Sint Maarten',
    issuer: 'Centrale Bank van Curaçao en Sint Maarten',
    title: '200 Caribbean Guilders',
    description: 'The front shows a longsnout seahorse. It is distinguished by the Queen Emma Bridge motif, tying the note to Curaçao\'s best-known landmark.',
    hue: 225,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/04-curacao-and-sint-maarten-200-caribbean-guilders-mar-2025.jpg',
  },
  {
    id: 'e16',
    year: 2025,
    date: 'May 2025',
    country: 'Egypt',
    issuer: 'Central Bank of Egypt',
    title: '5 Pounds',
    description: 'The front shows the Mosque of Ahmad Ibn Tulun in Cairo. A distinctive element is the Nile bounty frieze paired with the 2025-dated continuation of this long-running type.',
    hue: 20,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/05-egypt-5-pounds-may-2025.jpg',
  },
  {
    id: 'e17',
    year: 2025,
    date: 'Sep 2025',
    country: 'Egypt',
    issuer: 'Central Bank of Egypt',
    title: '20 Pounds',
    description: 'The front shows the Mosque of Muhammad Ali in Cairo. Its distinctive historical motif is the war chariot and frieze from the chapel of Senusret I.',
    hue: 30,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/06-egypt-20-pounds-sep-2025.jpg',
  },
  {
    id: 'e18',
    year: 2025,
    date: 'Dec 2025',
    country: 'Egypt',
    issuer: 'Central Bank of Egypt',
    title: '50 Pounds',
    description: 'The front shows Abu Hariba Mosque in Cairo. A distinctive feature is the reference to Edfu Temple on this 2025-dated variant.',
    hue: 0,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/07-egypt-50-pounds-dec-2025.jpg',
  },
  {
    id: 'e19',
    year: 2025,
    date: 'May 2025',
    country: 'Egypt',
    issuer: 'Central Bank of Egypt',
    title: '100 Pounds',
    description: 'The front shows Sultan Hassan Mosque in Cairo. Its distinctive ancient motif is the sphinx on the matching design family.',
    hue: 0,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/08-egypt-100-pounds-may-2025.jpg',
  },
  {
    id: 'e20',
    year: 2025,
    date: 'May 2025',
    country: 'Egypt',
    issuer: 'Central Bank of Egypt',
    title: '200 Pounds',
    description: 'The front shows Qani Bey Mosque in Cairo. A distinctive feature is the ancient Egyptian scribe motif carried on this high-denomination design.',
    hue: 35,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/09-egypt-200-pounds-may-2025.jpg',
  },
  {
    id: 'e21',
    year: 2025,
    date: 'Aug 2025',
    country: 'Falkland Islands',
    issuer: 'Government of the Falkland Islands',
    title: '5 Pounds',
    description: 'The front shows Charles III with the Falkland Islands outline, coat of arms, and black-browed albatrosses. A distinctive feature is the polymer wildlife-and-island identity of the new series.',
    hue: 345,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/10-falkland-islands-5-pounds-aug-2025.jpg',
  },
  {
    id: 'e22',
    year: 2025,
    date: 'Aug 2025',
    country: 'Falkland Islands',
    issuer: 'Government of the Falkland Islands',
    title: '10 Pounds',
    description: 'The front shows Charles III with the Falkland Islands outline, coat of arms, and black-browed albatrosses. A distinctive feature is the polymer wildlife-and-island identity of the new series.',
    hue: 180,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/11-falkland-islands-10-pounds-aug-2025.jpg',
  },
  {
    id: 'e23',
    year: 2025,
    date: 'Aug 2025',
    country: 'Falkland Islands',
    issuer: 'Government of the Falkland Islands',
    title: '20 Pounds',
    description: 'The front shows Charles III with the Falkland Islands outline, coat of arms, and black-browed albatrosses. A distinctive feature is the polymer wildlife-and-island identity of the new series.',
    hue: 20,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/12-falkland-islands-20-pounds-aug-2025.jpg',
  },
  {
    id: 'e24',
    year: 2025,
    date: 'Oct 2025',
    country: 'Guatemala',
    issuer: 'Banco de Guatemala',
    title: '100 Quetzales',
    description: 'The front shows Francisco Marroquín. It commemorates the anniversaries of Banco de Guatemala and San Carlos de Borromeo University.',
    hue: 30,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/13-guatemala-100-quetzales-oct-2025.jpg',
  },
  {
    id: 'e25',
    year: 2025,
    date: 'Mar 2025',
    country: 'Mexico',
    issuer: 'Banco de México',
    title: '100 Pesos',
    description: 'The front shows Juana Inés de la Cruz with the Colegio de San Ildefonso. A distinctive feature is the "100 Aniversario 1925–2025" overprint for the centenary of Banco de México.',
    hue: 350,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/14-mexico-100-pesos-mar-2025.jpg',
  },
  {
    id: 'e26',
    year: 2025,
    date: 'Mar 2025',
    country: 'Mexico',
    issuer: 'Banco de México',
    title: '200 Pesos',
    description: 'The front shows Miguel Hidalgo, José María Morelos, and the liberty bell motif. A distinctive feature is the "100 Aniversario 1925–2025" overprint for the centenary of Banco de México.',
    hue: 105,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/15-mexico-200-pesos-mar-2025.jpg',
  },
  {
    id: 'e27',
    year: 2025,
    date: 'Mar 2025',
    country: 'Mexico',
    issuer: 'Banco de México',
    title: '500 Pesos',
    description: 'The front shows Benito Juárez entering Mexico City alongside his portrait. A distinctive feature is the "100 Aniversario 1925–2025" overprint for the centenary of Banco de México.',
    hue: 210,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/16-mexico-500-pesos-mar-2025.jpg',
  },
  {
    id: 'e28',
    year: 2025,
    date: 'Jul 2025',
    country: 'Mexico',
    issuer: 'Banco de México',
    title: '200 Pesos',
    description: 'The front shows Miguel Hidalgo, José María Morelos, and the liberty bell motif. This is the 2025-dated continuation of the established 200-peso family rather than the centenary overprint type.',
    hue: 0,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/17-mexico-200-pesos-jul-2025.jpg',
  },
  {
    id: 'e29',
    year: 2025,
    date: 'Jul 2025',
    country: 'Maldives',
    issuer: 'Maldives Monetary Authority',
    title: '10 Rufiyaa',
    description: 'The front shows men and women playing traditional drums. A distinctive feature is the cultural scene with a toddy tapper climbing a coconut palm.',
    hue: 40,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/18-maldives-10-rufiyaa-jul-2025.jpg',
  },
  {
    id: 'e30',
    year: 2025,
    date: 'Jul 2025',
    country: 'Maldives',
    issuer: 'Maldives Monetary Authority',
    title: '20 Rufiyaa',
    description: 'The front shows a jet taking off from Ibrahim Nasir International Airport. A distinctive feature is the maritime economy imagery with tuna fishing and the traditional dhoni.',
    hue: 220,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/19-maldives-20-rufiyaa-jul-2025.jpg',
  },
  {
    id: 'e31',
    year: 2025,
    date: 'Jul 2025',
    country: 'Maldives',
    issuer: 'Maldives Monetary Authority',
    title: '100 Rufiyaa',
    description: 'The front shows a group in traditional attire, including a woman working on a libaas neckline. A distinctive feature is the early Dhivehi script reference on the note.',
    hue: 0,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/20-maldives-100-rufiyaa-jul-2025.jpg',
  },
  {
    id: 'e32',
    year: 2025,
    date: 'Dec 2025',
    country: 'Mongolia',
    issuer: 'Mongolbank',
    title: '100,000 Tögrög',
    description: 'The front shows Chinggis Khaan against a mountainous backdrop. It commemorates the 100th anniversaries of the People\'s Revolution and the tögrög currency.',
    hue: 25,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/21-mongolia-100-000-togrog-dec-2025.jpg',
  },
  {
    id: 'e33',
    year: 2025,
    date: 'Jan 2025',
    country: 'Poland',
    issuer: 'Narodowy Bank Polski',
    title: '10 Zlotych',
    description: 'The front shows Duke Mieszko I. A distinctive feature is the 2025-dated refresh of the standard note with the silver denar motif.',
    hue: 50,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/22-poland-10-zlotych-jan-2025.jpg',
  },
  {
    id: 'e34',
    year: 2025,
    date: 'Mar 2025',
    country: 'Poland',
    issuer: 'Narodowy Bank Polski',
    title: '20 Zlotych',
    description: 'The front shows King Bolesław I Chrobry. A distinctive feature is the 2025-dated refresh of the standard note with the medieval seal motif.',
    hue: 10,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/23-poland-20-zlotych-mar-2025.jpg',
  },
  {
    id: 'e35',
    year: 2025,
    date: 'Aug 2025',
    country: 'Sri Lanka',
    issuer: 'Central Bank of Sri Lanka',
    title: '2,000 Rupees',
    description: 'The front shows the Central Bank of Sri Lanka building in Colombo. It commemorates the bank\'s 75th anniversary under the motto "Stability for Prosperity."',
    hue: 200,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/24-sri-lanka-2-000-rupees-aug-2025.jpg',
  },
  {
    id: 'e36',
    year: 2025,
    date: 'Jul 2025',
    country: 'Tunisia',
    issuer: 'Banque Centrale de Tunisie',
    title: '50 Dinars',
    description: 'The front shows Hédi Nouira. A distinctive feature is the Banque Centrale de Tunisie building in Tunis on this 2025-dated issue.',
    hue: 30,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/25-tunisia-50-dinars-jul-2025.jpg',
  },
  {
    id: 'e37',
    year: 2025,
    date: 'Jul 2025',
    country: 'Tunisia',
    issuer: 'Banque Centrale de Tunisie',
    title: '20 Dinars',
    description: 'The front shows Farhat Hached. A distinctive feature is the El Jem amphitheater on this 2025-dated version.',
    hue: 15,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/26-tunisia-20-dinars-jul-2025.jpg',
  },
  {
    id: 'e38',
    year: 2025,
    date: 'Jul 2025',
    country: 'Tunisia',
    issuer: 'Banque Centrale de Tunisie',
    title: '5 Dinars',
    description: 'The front shows Slaheddine el-Amami. A distinctive feature is the Roman aqueducts of Zaghouan on the matching design.',
    hue: 110,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/27-tunisia-5-dinars-jul-2025.jpg',
  },
  {
    id: 'e39',
    year: 2025,
    date: 'Jul 2025',
    country: 'Tunisia',
    issuer: 'Banque Centrale de Tunisie',
    title: '10 Dinars',
    description: 'The front shows Dr. Tawhida Ben Cheikh. A distinctive feature is the Berber pottery and jewellery theme on this 2025-dated issue.',
    hue: 25,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/28-tunisia-10-dinars-jul-2025.jpg',
  },
  {
    id: 'e40',
    year: 2025,
    date: 'Jun 2025',
    country: 'Venezuela',
    issuer: 'Banco Central de Venezuela',
    title: '200 Bolívares',
    description: 'The front shows three portraits of Simón Bolívar. It commemorates the bicentennial of the Battle of Maracaibo.',
    hue: 35,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/29-venezuela-200-bolivares-jun-2025.jpg',
  },
  {
    id: 'e41',
    year: 2025,
    date: 'Jun 2025',
    country: 'Venezuela',
    issuer: 'Banco Central de Venezuela',
    title: '500 Bolívares',
    description: 'The front shows three portraits of Simón Bolívar. It commemorates the bicentennial of the Battle of Maracaibo.',
    hue: 35,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-remaining-30/30-venezuela-500-bolivares-jun-2025.jpg',
  },
  {
    id: 'e42',
    year: 2025,
    date: '2025',
    country: 'Papua New Guinea',
    issuer: 'Bank of Papua New Guinea',
    title: '50 Kina',
    description: 'Arms and Parliament building at Port Moresby with anniversary context for 50 years of independence and national currency.',
    hue: 25,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-uscite-2025-banknotes/fronts/2026-06-04-png-p-w58-front.jpg',
  },
  {
    id: 'e43',
    year: 2026,
    date: '2026',
    country: 'Papua New Guinea',
    issuer: 'Bank of Papua New Guinea',
    title: '100 Kina',
    description: 'Arms and Parliament building with a memorial issue for the first anniversary of Sir Julius Chan.',
    hue: 50,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-uscite-2025-banknotes/fronts/2026-06-04-png-p-w59-front.jpg',
  },
  {
    id: 'e44',
    year: 2025,
    date: '2025',
    country: 'Tajikistan',
    issuer: 'National Bank of Tajikistan',
    title: '100 Somoni',
    description: 'Ismoili Somoni on the front with the 25 Years of Somoni currency commemorative issue.',
    hue: 210,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-uscite-2025-banknotes/fronts/2026-06-04-taj-p-w28-front.jpg',
  },
  {
    id: 'e45',
    year: 2025,
    date: '2025',
    country: 'Transnistria',
    issuer: 'Pridnestrovskiy Respublikanskiy Bank',
    title: "1 Rubl'",
    description: 'Generalissimo Alexander Suvorov with commemorative overprint for the 80th anniversary of victory in WWII.',
    hue: 25,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-uscite-2025-banknotes/fronts/2026-06-04-tdn-p-w69d-front.jpg',
  },
  {
    id: 'e46',
    year: 2025,
    date: '2025',
    country: 'Thailand',
    issuer: 'Government of Thailand',
    title: '100 Baht',
    description: 'King Rama X with commemorative text for the 150th anniversary of the Ministry of Finance.',
    hue: 0,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-uscite-2025-banknotes/fronts/2026-06-04-thl-p-w144-front.jpg',
  },
];

const YEARS = [...new Set(EMISSIONS.map(e => e.year))].sort((a, b) => a - b);

export default function BanknotesNews() {
  const [yearFilter, setYearFilter] = useState<number | 'all'>('all');

  const visible = yearFilter === 'all' ? EMISSIONS : EMISSIONS.filter(e => e.year === yearFilter);
  const grouped = YEARS.filter(y => yearFilter === 'all' || y === yearFilter).map(y => ({
    year: y,
    items: visible.filter(e => e.year === y),
  })).filter(g => g.items.length > 0);

  return (
    <div>
      <div className="pad-x" style={{ padding: '44px 56px 26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ width: 9, height: 9, borderRadius: 99, background: 'var(--news)', boxShadow: '0 0 0 4px color-mix(in srgb, var(--news) 20%, transparent)', display: 'inline-block' }} />
          <span style={{ font: '700 12px/1 Hanken Grotesk,sans-serif', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--news)' }}>Banknotes News</span>
        </div>
        <h1 className="serif" style={{ fontWeight: 400, fontSize: 42, lineHeight: 1.05, margin: '0 0 12px' }}>New worldwide emissions</h1>
        <p style={{ font: '400 15px/1.6 Hanken Grotesk,sans-serif', color: 'var(--ink2)', maxWidth: 620, marginBottom: 22 }}>
          Upcoming and recent banknote issues from central banks around the world. Sorted by release date.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={() => setYearFilter('all')} style={{ font: '600 12px/1 Hanken Grotesk,sans-serif', padding: '8px 14px', borderRadius: 999, border: `1px solid ${yearFilter === 'all' ? 'var(--news)' : 'var(--line)'}`, background: yearFilter === 'all' ? 'var(--news)' : 'transparent', color: yearFilter === 'all' ? '#0c1418' : 'var(--ink2)', cursor: 'pointer' }}>
            All
          </button>
          {YEARS.map(y => (
            <button key={y} onClick={() => setYearFilter(y)} style={{ font: '600 12px/1 Hanken Grotesk,sans-serif', padding: '8px 14px', borderRadius: 999, border: `1px solid ${yearFilter === y ? 'var(--news)' : 'var(--line)'}`, background: yearFilter === y ? 'var(--news)' : 'transparent', color: yearFilter === y ? '#0c1418' : 'var(--ink2)', cursor: 'pointer' }}>
              {y}
            </button>
          ))}
        </div>
      </div>

      <div className="pad-x" style={{ padding: '0 56px 60px' }}>
        {grouped.map(({ year, items }) => (
          <div key={year}>
            <div style={{ font: '600 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--ink2)', padding: '28px 0 16px', borderTop: '2px solid var(--line)', marginTop: 8 }}>
              {year}
            </div>
            {items.map(e => (
              <div key={e.id} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24, padding: '20px 0', borderTop: '1px solid var(--line)', alignItems: 'start' }}>
                <div style={{ width: 160, flexShrink: 0, aspectRatio: '8/5', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--card)', position: 'relative' }}>
                  {e.imageUrl
                    ? <Image src={e.imageUrl} alt={e.title} fill style={{ objectFit: 'contain', background: '#111' }} unoptimized />
                    : <Banknote hue={e.hue} dark label={e.country} style={{ width: '100%', height: '100%' }} />
                  }
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ font: '600 10px/1 Hanken Grotesk,sans-serif', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink2)' }}>{e.country}</span>
                    <span style={{ width: 3, height: 3, borderRadius: 99, background: 'var(--line)', display: 'inline-block' }} />
                    <span style={{ font: '500 11px/1 Hanken Grotesk,sans-serif', color: 'var(--news)' }}>{e.date}</span>
                  </div>
                  <div className="serif" style={{ fontSize: 20, lineHeight: 1.25, marginBottom: 8 }}>{e.title}</div>
                  <div style={{ font: '400 13px/1.6 Hanken Grotesk,sans-serif', color: 'var(--ink2)' }}>{e.description}</div>
                  <div style={{ font: '500 12px/1 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginTop: 10 }}>{e.issuer}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
