import * as React from 'react';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Autocomplete, SelectItem } from '../Autocomplete/Autocomplete';
import { RenderTree, RichTree } from '../RichTree/RichTree';
import { Dialog } from '../Dialog/Dialog';

const data: RenderTree = {
  id: 'root',
  name: 'Nationella ämneskategorier',
  children: [
    {
      id: '6',
      name: 'Humaniora och konst',
      children: [
        {
          id: '605',
          name: 'Annan humaniora',
          children: [
            {
              id: '60501',
              name: 'Antikvetenskap',
              children: [],
            },
            {
              id: '60503',
              name: 'Etnologi',
              children: [],
            },
            {
              id: '60502',
              name: 'Kulturstudier',
              children: [],
            },
            {
              id: '60599',
              name: 'Övrig annan humaniora',
              children: [],
            },
          ],
        },
        {
          id: '603',
          name: 'Filosofi, etik och religion',
          children: [
            {
              id: '60302',
              name: 'Etik',
              children: [],
            },
            {
              id: '60301',
              name: 'Filosofi',
              children: [],
            },
            {
              id: '60305',
              name: 'Idé- och lärdomshistoria',
              children: [],
            },
            {
              id: '60304',
              name: 'Religionshistoria',
              children: [],
            },
            {
              id: '60303',
              name: 'Religionsvetenskap',
              children: [],
            },
          ],
        },
        {
          id: '601',
          name: 'Historia och arkeologi',
          children: [
            {
              id: '60103',
              name: 'Arkeologi',
              children: [],
            },
            {
              id: '60101',
              name: 'Historia',
              children: [],
            },
            {
              id: '60102',
              name: 'Teknikhistoria',
              children: [],
            },
          ],
        },
        {
          id: '604',
          name: 'Konst',
          children: [
            {
              id: '60405',
              name: 'Arkitektur',
              children: [],
            },
            {
              id: '60401',
              name: 'Bildkonst',
              children: [],
            },
            {
              id: '60406',
              name: 'Design',
              children: [],
            },
            {
              id: '60410',
              name: 'Filmvetenskap',
              children: [],
            },
            {
              id: '60407',
              name: 'Konstvetenskap',
              children: [],
            },
            {
              id: '60403',
              name: 'Litterär gestaltning',
              children: [],
            },
            {
              id: '60402',
              name: 'Musik',
              children: [],
            },
            {
              id: '60408',
              name: 'Musikvetenskap',
              children: [],
            },
            {
              id: '60404',
              name: 'Scenkonst',
              children: [],
            },
            {
              id: '60409',
              name: 'Teatervetenskap',
              children: [],
            },
          ],
        },
        {
          id: '602',
          name: 'Språk och litteratur',
          children: [
            {
              id: '60201',
              name: 'Jämförande språkvetenskap och allmän lingvistik',
              children: [],
            },
            {
              id: '60204',
              name: 'Litteraturstudier',
              children: [],
            },
            {
              id: '60203',
              name: 'Litteraturvetenskap',
              children: [],
            },
            {
              id: '60202',
              name: 'Studier av enskilda språk',
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: '4',
      name: 'Lantbruksvetenskap och veterinärmedicin',
      children: [
        {
          id: '405',
          name: 'Annan lantbruksvetenskap',
          children: [
            {
              id: '40501',
              name: 'Förnyelsebar bioenergi',
              children: [],
            },
            {
              id: '40503',
              name: 'Lantbrukets arbetsmiljö och säkerhet',
              children: [],
            },
            {
              id: '40504',
              name: 'Miljö- och naturvårdsvetenskap',
              children: [],
            },
            {
              id: '40502',
              name: 'Vilt- och fiskeförvaltning',
              children: [],
            },
            {
              id: '40599',
              name: 'Övrig annan lantbruksvetenskap',
              children: [],
            },
          ],
        },
        {
          id: '404',
          name: 'Bioteknologi med applikationer på växter och djur',
          children: [
            {
              id: '40402',
              name: 'Genetik och förädling inom lantbruksvetenskap',
              children: [],
            },
            {
              id: '40401',
              name: 'Växtbioteknologi',
              children: [],
            },
          ],
        },
        {
          id: '402',
          name: 'Husdjursvetenskap',
          children: [],
        },
        {
          id: '401',
          name: 'Lantbruksvetenskap, skogsbruk och fiske',
          children: [
            {
              id: '40107',
              name: 'Fisk- och akvakulturforskning',
              children: [],
            },
            {
              id: '40101',
              name: 'Jordbruksvetenskap',
              children: [],
            },
            {
              id: '40108',
              name: 'Landskapsarkitektur',
              children: [],
            },
            {
              id: '40103',
              name: 'Livsmedelsvetenskap',
              children: [],
            },
            {
              id: '40106',
              name: 'Markvetenskap',
              children: [],
            },
            {
              id: '40104',
              name: 'Skogsvetenskap',
              children: [],
            },
            {
              id: '40102',
              name: 'Trädgårdsvetenskap/hortikultur',
              children: [],
            },
            {
              id: '40105',
              name: 'Trävetenskap',
              children: [],
            },
          ],
        },
        {
          id: '403',
          name: 'Veterinärmedicin',
          children: [
            {
              id: '40304',
              name: 'Annan veterinärmedicin',
              children: [],
            },
            {
              id: '40303',
              name: 'Klinisk vetenskap',
              children: [],
            },
            {
              id: '40301',
              name: 'Medicinsk biovetenskap',
              children: [],
            },
            {
              id: '40302',
              name: 'Patobiologi',
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: '3',
      name: 'Medicin och hälsovetenskap',
      children: [
        {
          id: '305',
          name: 'Annan medicin och hälsovetenskap',
          children: [
            {
              id: '30502',
              name: 'Gerontologi, medicinsk/hälsovetenskaplig inriktning',
              children: [],
            },
            {
              id: '30501',
              name: 'Rättsmedicin',
              children: [],
            },
            {
              id: '30599',
              name: 'Övrig annan medicin och hälsovetenskap',
              children: [],
            },
          ],
        },
        {
          id: '303',
          name: 'Hälsovetenskaper',
          children: [
            {
              id: '30399',
              name: 'Annan hälsovetenskap',
              children: [],
            },
            {
              id: '30303',
              name: 'Arbetsmedicin och miljömedicin',
              children: [],
            },
            {
              id: '30306',
              name: 'Arbetsterapi',
              children: [],
            },
            {
              id: '30309',
              name: 'Beroendelära',
              children: [],
            },
            {
              id: '30302',
              name: 'Folkhälsovetenskap, global hälsa, socialmedicin och epidemiologi',
              children: [],
            },
            {
              id: '30301',
              name: 'Hälso- och sjukvårdsorganisation, hälsopolitik och hälsoekonomi',
              children: [],
            },
            {
              id: '30308',
              name: 'Idrottsvetenskap',
              children: [],
            },
            {
              id: '30310',
              name: 'Medicinsk etik',
              children: [],
            },
            {
              id: '30304',
              name: 'Näringslära',
              children: [],
            },
            {
              id: '30305',
              name: 'Omvårdnad',
              children: [],
            },
            {
              id: '30307',
              name: 'Sjukgymnastik',
              children: [],
            },
          ],
        },
        {
          id: '302',
          name: 'Klinisk medicin',
          children: [
            {
              id: '30224',
              name: 'Allmänmedicin',
              children: [],
            },
            {
              id: '30201',
              name: 'Anestesi och intensivvård',
              children: [],
            },
            {
              id: '30299',
              name: 'Annan klinisk medicin',
              children: [],
            },
            {
              id: '30203',
              name: 'Cancer och onkologi',
              children: [],
            },
            {
              id: '30204',
              name: 'Dermatologi och venereologi',
              children: [],
            },
            {
              id: '30205',
              name: 'Endokrinologi och diabetes',
              children: [],
            },
            {
              id: '30213',
              name: 'Gastroenterologi',
              children: [],
            },
            {
              id: '30222',
              name: 'Geriatrik',
              children: [],
            },
            {
              id: '30202',
              name: 'Hematologi',
              children: [],
            },
            {
              id: '30209',
              name: 'Infektionsmedicin',
              children: [],
            },
            {
              id: '30206',
              name: 'Kardiologi',
              children: [],
            },
            {
              id: '30212',
              name: 'Kirurgi',
              children: [],
            },
            {
              id: '30223',
              name: 'Klinisk laboratoriemedicin',
              children: [],
            },
            {
              id: '30219',
              name: 'Lungmedicin och allergi',
              children: [],
            },
            {
              id: '30207',
              name: 'Neurologi',
              children: [],
            },
            {
              id: '30216',
              name: 'Odontologi',
              children: [],
            },
            {
              id: '30217',
              name: 'Oftalmologi',
              children: [],
            },
            {
              id: '30211',
              name: 'Ortopedi',
              children: [],
            },
            {
              id: '30218',
              name: 'Oto-rino-laryngologi',
              children: [],
            },
            {
              id: '30221',
              name: 'Pediatrik',
              children: [],
            },
            {
              id: '30215',
              name: 'Psykiatri',
              children: [],
            },
            {
              id: '30208',
              name: 'Radiologi och bildbehandling',
              children: [],
            },
            {
              id: '30220',
              name: 'Reproduktionsmedicin och gynekologi',
              children: [],
            },
            {
              id: '30210',
              name: 'Reumatologi och inflammation',
              children: [],
            },
            {
              id: '30214',
              name: 'Urologi och njurmedicin',
              children: [],
            },
          ],
        },
        {
          id: '304',
          name: 'Medicinsk bioteknologi',
          children: [
            {
              id: '30499',
              name: 'Annan medicinsk bioteknologi',
              children: [],
            },
            {
              id: '30403',
              name: 'Biomaterialvetenskap',
              children: [],
            },
            {
              id: '30402',
              name: 'Biomedicinsk laboratorievetenskap/teknologi',
              children: [],
            },
            {
              id: '30401',
              name: 'Medicinsk bioteknologi (med inriktning mot cellbiologi (inklusive stamcellsbiologi), molekylärbiologi, mikrobiologi, biokemi eller biofarmaci)',
              children: [],
            },
          ],
        },
        {
          id: '301',
          name: 'Medicinska och farmaceutiska grundvetenskaper',
          children: [
            {
              id: '30199',
              name: 'Annan medicinsk grundvetenskap',
              children: [],
            },
            {
              id: '30108',
              name: 'Cell- och molekylärbiologi',
              children: [],
            },
            {
              id: '30101',
              name: 'Farmaceutiska vetenskaper',
              children: [],
            },
            {
              id: '30102',
              name: 'Farmakologi och toxikologi',
              children: [],
            },
            {
              id: '30106',
              name: 'Fysiologi',
              children: [],
            },
            {
              id: '30110',
              name: 'Immunologi inom det medicinska området',
              children: [],
            },
            {
              id: '30103',
              name: 'Läkemedelskemi',
              children: [],
            },
            {
              id: '30107',
              name: 'Medicinsk genetik',
              children: [],
            },
            {
              id: '30109',
              name: 'Mikrobiologi inom det medicinska området',
              children: [],
            },
            {
              id: '30105',
              name: 'Neurovetenskaper',
              children: [],
            },
            {
              id: '30104',
              name: 'Samhällsfarmaci och klinisk farmaci',
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: '1',
      name: 'Naturvetenskap',
      children: [
        {
          id: '107',
          name: 'Annan naturvetenskap',
          children: [],
        },
        {
          id: '106',
          name: 'Biologiska vetenskaper',
          children: [
            {
              id: '10699',
              name: 'Annan biologi',
              children: [],
            },
            {
              id: '10603',
              name: 'Biofysik',
              children: [],
            },
            {
              id: '10610',
              name: 'Bioinformatik och systembiologi',
              children: [],
            },
            {
              id: '10602',
              name: 'Biokemi och molekylärbiologi',
              children: [],
            },
            {
              id: '10612',
              name: 'Biologisk systematik',
              children: [],
            },
            {
              id: '10607',
              name: 'Botanik',
              children: [],
            },
            {
              id: '10604',
              name: 'Cellbiologi',
              children: [],
            },
            {
              id: '10611',
              name: 'Ekologi',
              children: [],
            },
            {
              id: '10613',
              name: 'Etologi',
              children: [],
            },
            {
              id: '10615',
              name: 'Evolutionsbiologi',
              children: [],
            },
            {
              id: '10609',
              name: 'Genetik',
              children: [],
            },
            {
              id: '10605',
              name: 'Immunologi',
              children: [],
            },
            {
              id: '10606',
              name: 'Mikrobiologi',
              children: [],
            },
            {
              id: '10601',
              name: 'Strukturbiologi',
              children: [],
            },
            {
              id: '10614',
              name: 'Utvecklingsbiologi',
              children: [],
            },
            {
              id: '10608',
              name: 'Zoologi',
              children: [],
            },
          ],
        },
        {
          id: '102',
          name: 'Data- och informationsvetenskap',
          children: [
            {
              id: '10299',
              name: 'Annan data- och informationsvetenskap',
              children: [],
            },
            {
              id: '10203',
              name: 'Bioinformatik (beräkningsbiologi)',
              children: [],
            },
            {
              id: '10201',
              name: 'Datavetenskap (datalogi)',
              children: [],
            },
            {
              id: '10207',
              name: 'Datorseende och robotik (autonoma system)',
              children: [],
            },
            {
              id: '10206',
              name: 'Datorteknik',
              children: [],
            },
            {
              id: '10209',
              name: 'Medieteknik',
              children: [],
            },
            {
              id: '10204',
              name: 'Människa-datorinteraktion (interaktionsdesign)',
              children: [],
            },
            {
              id: '10205',
              name: 'Programvaruteknik',
              children: [],
            },
            {
              id: '10208',
              name: 'Språkteknologi (språkvetenskaplig databehandling)',
              children: [],
            },
            {
              id: '10202',
              name: 'Systemvetenskap, informationssystem och informatik',
              children: [],
            },
          ],
        },
        {
          id: '103',
          name: 'Fysik',
          children: [
            {
              id: '10306',
              name: 'Acceleratorfysik och instrumentering',
              children: [],
            },
            {
              id: '10399',
              name: 'Annan fysik',
              children: [],
            },
            {
              id: '10305',
              name: 'Astronomi, astrofysik och kosmologi',
              children: [],
            },
            {
              id: '10302',
              name: 'Atom- och molekylfysik och optik',
              children: [],
            },
            {
              id: '10304',
              name: 'Den kondenserade materiens fysik',
              children: [],
            },
            {
              id: '10303',
              name: 'Fusion, plasma och rymdfysik',
              children: [],
            },
            {
              id: '10301',
              name: 'Subatomär fysik',
              children: [],
            },
          ],
        },
        {
          id: '105',
          name: 'Geovetenskap och miljövetenskap',
          children: [
            {
              id: '10599',
              name: 'Annan geovetenskap och miljövetenskap',
              children: [],
            },
            {
              id: '10505',
              name: 'Geofysik',
              children: [],
            },
            {
              id: '10506',
              name: 'Geokemi',
              children: [],
            },
            {
              id: '10504',
              name: 'Geologi',
              children: [],
            },
            {
              id: '10501',
              name: 'Klimatforskning',
              children: [],
            },
            {
              id: '10508',
              name: 'Meteorologi och atmosfärforskning',
              children: [],
            },
            {
              id: '10502',
              name: 'Miljövetenskap',
              children: [],
            },
            {
              id: '10503',
              name: 'Multidisciplinär geovetenskap',
              children: [],
            },
            {
              id: '10507',
              name: 'Naturgeografi',
              children: [],
            },
            {
              id: '10509',
              name: 'Oceanografi, hydrologi och vattenresurser',
              children: [],
            },
          ],
        },
        {
          id: '104',
          name: 'Kemi',
          children: [
            {
              id: '10401',
              name: 'Analytisk kemi',
              children: [],
            },
            {
              id: '10499',
              name: 'Annan kemi',
              children: [],
            },
            {
              id: '10402',
              name: 'Fysikalisk kemi',
              children: [],
            },
            {
              id: '10403',
              name: 'Materialkemi',
              children: [],
            },
            {
              id: '10404',
              name: 'Oorganisk kemi',
              children: [],
            },
            {
              id: '10405',
              name: 'Organisk kemi',
              children: [],
            },
            {
              id: '10406',
              name: 'Polymerkemi',
              children: [],
            },
            {
              id: '10407',
              name: 'Teoretisk kemi',
              children: [],
            },
          ],
        },
        {
          id: '101',
          name: 'Matematik',
          children: [
            {
              id: '10103',
              name: 'Algebra och logik',
              children: [],
            },
            {
              id: '10199',
              name: 'Annan matematik',
              children: [],
            },
            {
              id: '10105',
              name: 'Beräkningsmatematik',
              children: [],
            },
            {
              id: '10104',
              name: 'Diskret matematik',
              children: [],
            },
            {
              id: '10102',
              name: 'Geometri',
              children: [],
            },
            {
              id: '10101',
              name: 'Matematisk analys',
              children: [],
            },
            {
              id: '10106',
              name: 'Sannolikhetsteori och statistik',
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: '5',
      name: 'Samhällsvetenskap',
      children: [
        {
          id: '509',
          name: 'Annan samhällsvetenskap',
          children: [
            {
              id: '50903',
              name: 'Arbetslivsstudier',
              children: [],
            },
            {
              id: '50902',
              name: 'Genusstudier',
              children: [],
            },
            {
              id: '50904',
              name: 'Internationell Migration och Etniska Relationer (IMER)',
              children: [],
            },
            {
              id: '50901',
              name: 'Tvärvetenskapliga studier inom samhällsvetenskap',
              children: [],
            },
            {
              id: '50999',
              name: 'Övrig annan samhällsvetenskap',
              children: [],
            },
          ],
        },
        {
          id: '502',
          name: 'Ekonomi och näringsliv',
          children: [
            {
              id: '50203',
              name: 'Ekonomisk historia',
              children: [],
            },
            {
              id: '50202',
              name: 'Företagsekonomi',
              children: [],
            },
            {
              id: '50201',
              name: 'Nationalekonomi',
              children: [],
            },
          ],
        },
        {
          id: '505',
          name: 'Juridik',
          children: [
            {
              id: '50501',
              name: 'Juridik (exklusive juridik och samhälle)',
              children: [],
            },
            {
              id: '50502',
              name: 'Juridik och samhälle',
              children: [],
            },
          ],
        },
        {
          id: '508',
          name: 'Medie- och kommunikationsvetenskap',
          children: [
            {
              id: '50805',
              name: 'Biblioteks- och informationsvetenskap',
              children: [],
            },
            {
              id: '50802',
              name: 'Kommunikationsvetenskap',
              children: [],
            },
            {
              id: '50801',
              name: 'Medievetenskap',
              children: [],
            },
            {
              id: '50803',
              name: 'Mänsklig interaktion med IKT',
              children: [],
            },
            {
              id: '50804',
              name: 'Systemvetenskap, informationssystem och informatik med samhällsvetenskaplig inriktning',
              children: [],
            },
          ],
        },
        {
          id: '501',
          name: 'Psykologi',
          children: [
            {
              id: '50101',
              name: 'Psykologi (exklusive tillämpad psykologi)',
              children: [],
            },
            {
              id: '50102',
              name: 'Tillämpad psykologi',
              children: [],
            },
          ],
        },
        {
          id: '507',
          name: 'Social och ekonomisk geografi',
          children: [
            {
              id: '50702',
              name: 'Ekonomisk geografi',
              children: [],
            },
            {
              id: '50701',
              name: 'Kulturgeografi',
              children: [],
            },
          ],
        },
        {
          id: '504',
          name: 'Sociologi',
          children: [
            {
              id: '50404',
              name: 'Socialantropologi',
              children: [],
            },
            {
              id: '50403',
              name: 'Socialpsykologi',
              children: [],
            },
            {
              id: '50402',
              name: 'Socialt arbete',
              children: [],
            },
            {
              id: '50401',
              name: 'Sociologi (exklusive socialt arbete, socialpsykologi och socialantropologi)',
              children: [],
            },
          ],
        },
        {
          id: '506',
          name: 'Statsvetenskap',
          children: [
            {
              id: '50603',
              name: 'Globaliseringsstudier',
              children: [],
            },
            {
              id: '50601',
              name: 'Statsvetenskap (exklusive studier av offentlig förvaltning och globaliseringsstudier)',
              children: [],
            },
            {
              id: '50602',
              name: 'Studier av offentlig förvaltning',
              children: [],
            },
          ],
        },
        {
          id: '503',
          name: 'Utbildningsvetenskap',
          children: [
            {
              id: '50302',
              name: 'Didaktik',
              children: [],
            },
            {
              id: '50303',
              name: 'Lärande',
              children: [],
            },
            {
              id: '50301',
              name: 'Pedagogik',
              children: [],
            },
            {
              id: '50304',
              name: 'Pedagogiskt arbete',
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'Teknik och teknologier',
      children: [
        {
          id: '211',
          name: 'Annan teknik',
          children: [
            {
              id: '21103',
              name: 'Interaktionsteknik',
              children: [],
            },
            {
              id: '21101',
              name: 'Livsmedelsteknik',
              children: [],
            },
            {
              id: '21102',
              name: 'Mediateknik',
              children: [],
            },
            {
              id: '21199',
              name: 'Övrig annan teknik',
              children: [],
            },
          ],
        },
        {
          id: '202',
          name: 'Elektroteknik och elektronik',
          children: [
            {
              id: '20299',
              name: 'Annan elektroteknik och elektronik',
              children: [],
            },
            {
              id: '20206',
              name: 'Datorsystem',
              children: [],
            },
            {
              id: '20207',
              name: 'Inbäddad systemteknik',
              children: [],
            },
            {
              id: '20203',
              name: 'Kommunikationssystem',
              children: [],
            },
            {
              id: '20202',
              name: 'Reglerteknik',
              children: [],
            },
            {
              id: '20201',
              name: 'Robotteknik och automation',
              children: [],
            },
            {
              id: '20205',
              name: 'Signalbehandling',
              children: [],
            },
            {
              id: '20204',
              name: 'Telekommunikation',
              children: [],
            },
          ],
        },
        {
          id: '209',
          name: 'Industriell bioteknik',
          children: [
            {
              id: '20999',
              name: 'Annan industriell bioteknik',
              children: [],
            },
            {
              id: '20904',
              name: 'Bioenergi',
              children: [],
            },
            {
              id: '20906',
              name: 'Biokatalys och enzymteknik',
              children: [],
            },
            {
              id: '20902',
              name: 'Biokemikalier',
              children: [],
            },
            {
              id: '20903',
              name: 'Biomaterial',
              children: [],
            },
            {
              id: '20901',
              name: 'Bioprocessteknik',
              children: [],
            },
            {
              id: '20907',
              name: 'Bioteknisk apparatteknik',
              children: [],
            },
            {
              id: '20905',
              name: 'Läkemedelsbioteknik',
              children: [],
            },
            {
              id: '20908',
              name: 'Medicinsk bioteknik',
              children: [],
            },
          ],
        },
        {
          id: '204',
          name: 'Kemiteknik',
          children: [
            {
              id: '20499',
              name: 'Annan kemiteknik',
              children: [],
            },
            {
              id: '20404',
              name: 'Farmaceutisk synteskemi',
              children: [],
            },
            {
              id: '20401',
              name: 'Kemiska processer',
              children: [],
            },
            {
              id: '20402',
              name: 'Korrosionsteknik',
              children: [],
            },
            {
              id: '20403',
              name: 'Polymerteknologi',
              children: [],
            },
          ],
        },
        {
          id: '203',
          name: 'Maskinteknik',
          children: [
            {
              id: '20399',
              name: 'Annan maskinteknik',
              children: [],
            },
            {
              id: '20304',
              name: 'Energiteknik',
              children: [],
            },
            {
              id: '20303',
              name: 'Farkostteknik',
              children: [],
            },
            {
              id: '20307',
              name: 'Produktionsteknik, arbetsvetenskap och ergonomi',
              children: [],
            },
            {
              id: '20302',
              name: 'Rymd- och flygteknik',
              children: [],
            },
            {
              id: '20306',
              name: 'Strömningsmekanik och akustik',
              children: [],
            },
            {
              id: '20301',
              name: 'Teknisk mekanik',
              children: [],
            },
            {
              id: '20305',
              name: 'Tillförlitlighets- och kvalitetsteknik',
              children: [],
            },
            {
              id: '20308',
              name: 'Tribologi (ytteknik omfattande friktion, nötning och smörjning)',
              children: [],
            },
          ],
        },
        {
          id: '205',
          name: 'Materialteknik',
          children: [
            {
              id: '20599',
              name: 'Annan materialteknik',
              children: [],
            },
            {
              id: '20505',
              name: 'Bearbetnings-, yt- och fogningsteknik',
              children: [],
            },
            {
              id: '20501',
              name: 'Keramteknik',
              children: [],
            },
            {
              id: '20502',
              name: 'Kompositmaterial och -teknik',
              children: [],
            },
            {
              id: '20506',
              name: 'Metallurgi och metalliska material',
              children: [],
            },
            {
              id: '20503',
              name: 'Pappers-, massa- och fiberteknik',
              children: [],
            },
            {
              id: '20504',
              name: 'Textil-, gummi- och polymermaterial',
              children: [],
            },
          ],
        },
        {
          id: '206',
          name: 'Medicinteknik',
          children: [
            {
              id: '20699',
              name: 'Annan medicinteknik',
              children: [],
            },
            {
              id: '20604',
              name: 'Medicinsk apparatteknik',
              children: [],
            },
            {
              id: '20603',
              name: 'Medicinsk bildbehandling',
              children: [],
            },
            {
              id: '20605',
              name: 'Medicinsk ergonomi',
              children: [],
            },
            {
              id: '20601',
              name: 'Medicinsk laboratorie- och mätteknik',
              children: [],
            },
            {
              id: '20602',
              name: 'Medicinska material och protesteknik',
              children: [],
            },
          ],
        },
        {
          id: '208',
          name: 'Miljöbioteknik',
          children: [
            {
              id: '20899',
              name: 'Annan miljöbioteknik',
              children: [],
            },
            {
              id: '20801',
              name: 'Biosanering',
              children: [],
            },
            {
              id: '20804',
              name: 'Bioteknisk etik',
              children: [],
            },
            {
              id: '20802',
              name: 'Diagnostisk bioteknologi',
              children: [],
            },
            {
              id: '20803',
              name: 'Vattenbehandling',
              children: [],
            },
          ],
        },
        {
          id: '210',
          name: 'Nanoteknik',
          children: [],
        },
        {
          id: '207',
          name: 'Naturresursteknik',
          children: [
            {
              id: '20799',
              name: 'Annan naturresursteknik',
              children: [],
            },
            {
              id: '20702',
              name: 'Energisystem',
              children: [],
            },
            {
              id: '20703',
              name: 'Fjärranalysteknik',
              children: [],
            },
            {
              id: '20701',
              name: 'Geofysisk teknik',
              children: [],
            },
            {
              id: '20706',
              name: 'Havs- och vattendragsteknik',
              children: [],
            },
            {
              id: '20705',
              name: 'Marin teknik',
              children: [],
            },
            {
              id: '20707',
              name: 'Miljöledning',
              children: [],
            },
            {
              id: '20704',
              name: 'Mineral- och gruvteknik',
              children: [],
            },
          ],
        },
        {
          id: '201',
          name: 'Samhällsbyggnadsteknik',
          children: [
            {
              id: '20199',
              name: 'Annan samhällsbyggnadsteknik',
              children: [],
            },
            {
              id: '20101',
              name: 'Arkitekturteknik',
              children: [],
            },
            {
              id: '20102',
              name: 'Byggproduktion',
              children: [],
            },
            {
              id: '20106',
              name: 'Geoteknik',
              children: [],
            },
            {
              id: '20103',
              name: 'Husbyggnad',
              children: [],
            },
            {
              id: '20104',
              name: 'Infrastrukturteknik',
              children: [],
            },
            {
              id: '20108',
              name: 'Miljöanalys och bygginformationsteknik',
              children: [],
            },
            {
              id: '20105',
              name: 'Transportteknik och logistik',
              children: [],
            },
            {
              id: '20107',
              name: 'Vattenteknik',
              children: [],
            },
          ],
        },
      ],
    },
  ],
};

interface SubjectCategoryPickerProps {
  onSelect?: (id: string) => void;
}

function getFlat(node: RenderTree): SelectItem[] {
  return [{ id: node.id, name: node.name } as SelectItem].concat(
    ...(node.children?.map(getFlat) ?? []),
  );
}

export const SubjectCategoryPicker = (
  props: SubjectCategoryPickerProps,
): JSX.Element => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSelected = (id: string) => {
    if (props.onSelect) props.onSelect(id);
    // should it be closed?
  };

  return (
    <>
      <Button
        disableRipple
        variant='outlined'
        onClick={handleClickOpen}
      >
        {t('Select national subject category')}
      </Button>
      <Dialog
        title={t('Select national subject category')}
        closeButton
        open={open}
        fixedHeader={
          <Autocomplete
            options={getFlat(data).sort((a, b) => a.name.localeCompare(b.name))}
            onSelected={handleSelected}
          />
        }
        closeAction={() => setOpen(false)}
      >
        <RichTree
          tree={data}
          onSelected={handleSelected}
        />
      </Dialog>
    </>
  );
};
