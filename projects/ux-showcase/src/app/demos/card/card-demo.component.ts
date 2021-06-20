import { Component } from '@angular/core';

@Component({
  selector: 'app-card-demo',
  templateUrl: './card-demo.component.html',
  styleUrls: ['./card-demo.component.scss'],
})
export class CardDemoComponent {
  public items: any[] = [
    {
      imageUrl: '/assets/donut.jpg',
      isDibbed: true,
      name: 'Active Ribbed Cropped Cami',
      price: 13,
    },
    {
      imageUrl:
        'https://giftdibs.s3.amazonaws.com/5bd26b69be29a6f2123a5ec5-1hWOuDEsvLSe3evDB78geJHAVUSmGkxV',
      name: 'Gaming chair',
      price: 300,
      isDelivered: true,
    },
    {
      name: 'Evening gown',
      price: 120,
      isReceived: true,
    },
    {
      imageUrl:
        'https://giftdibs.s3.amazonaws.com/5bd26b69be29a6f2123a5ec5-05Scp7MbQUmpQaw8EkEvhxhFpIBZfeoC',
      name: 'Diablo 3: Eternal Collection - PS4',
      price: 55,
    },
    {
      imageUrl:
        'https://giftdibs.s3.amazonaws.com/5bd26b69be29a6f2123a5ec5-4wcUnFjdxxTL7MLxjcMIDcP05GeutBcx',
      name: 'LEGO Slave I',
      price: 199,
    },
    {
      imageUrl:
        'https://giftdibs.s3.amazonaws.com/5bd26b69be29a6f2123a5ec6-rtP5c6xNUYaUwI4pPB9s9GPCRMfLThGI',
      name: 'Charleston print',
      price: 19,
    },
    {
      imageUrl:
        'https://giftdibs.s3.amazonaws.com/5bd26b69be29a6f2123a5ec6-QURQEDvurjsA92bWyeGmqanfdZJ0zqMU',
      name: 'Thatch throw pillow',
      price: 12,
    },
  ];

  constructor() {}

  public onActionClick(): void {}
}
