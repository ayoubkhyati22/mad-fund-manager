import { Component } from '@angular/core';

interface Bank {
  id: string;
  name: string;
  balance: number;
  accountType: string;
  icon: string;
  isExpanded: boolean;
  objectives: Objective[];
}

interface Objective {
  id: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  icon: string;
  iconClass: string;
  progressClass: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  banks: Bank[] = [
    {
      id: 'cih',
      name: 'CIH Bank',
      balance: 182000.00,
      accountType: 'Personal Account',
      icon: 'CIH',
      isExpanded: false,
      objectives: [
        {
          id: 'voyage',
          name: 'Voyage Fund',
          currentAmount: 2000,
          targetAmount: 10000,
          icon: 'airplane',
          iconClass: 'trip',
          progressClass: 'trip-progress'
        },
        {
          id: 'appartement',
          name: 'Appartement Fund',
          currentAmount: 40000,
          targetAmount: 200000,
          icon: 'home',
          iconClass: 'house',
          progressClass: 'house-progress'
        },
        {
          id: 'epargne',
          name: 'Épargne Goal',
          currentAmount: 50000,
          targetAmount: 100000,
          icon: 'wallet',
          iconClass: 'savings',
          progressClass: 'savings-progress'
        }
      ]
    },
    {
      id: 'bp',
      name: 'Banque Populaire',
      balance: 4010.00,
      accountType: 'Current Account',
      icon: 'BP',
      isExpanded: false,
      objectives: [
        {
          id: 'maintenance',
          name: 'Voiture Maintenance',
          currentAmount: 1,
          targetAmount: 5000,
          icon: 'car-sport',
          iconClass: 'car',
          progressClass: 'car-progress'
        },
        {
          id: 'special-purchase',
          name: 'Special Purchase (WL)',
          currentAmount: 4000,
          targetAmount: 4000,
          icon: 'diamond',
          iconClass: 'jewelry',
          progressClass: 'jewelry-progress'
        },
        {
          id: 'velo',
          name: 'Vélo Fund',
          currentAmount: 1,
          targetAmount: 2000,
          icon: 'bicycle',
          iconClass: 'bike',
          progressClass: 'bike-progress'
        }
      ]
    },
    {
      id: 'cfg',
      name: 'CFG Bank',
      balance: 500.00,
      accountType: 'Current Account',
      icon: 'CFG',
      isExpanded: false,
      objectives: [
        {
          id: 'bourse',
          name: 'La bourse',
          currentAmount: 500,
          targetAmount: 100000,
          icon: 'trending-up',
          iconClass: 'tech',
          progressClass: 'tech-progress'
        }
      ]
    },
      {
        id: 'barid',
        name: 'FATHER Bank',
        balance: 40000.00,
        accountType: 'Current Account',
        icon: 'FTR',
        isExpanded: false,
        objectives: [
          {
            id: 'app',
            name: 'L`appartement',
            currentAmount: 40000,
            targetAmount: 40000,
            icon: 'home',
            iconClass: 'tech',
            progressClass: 'tech-progress'
          }
        ]
      }
  ];

  constructor() {}

  toggleBank(bank: Bank) {
    // Fermer toutes les autres banques
    this.banks.forEach(b => {
      if (b.id !== bank.id) {
        b.isExpanded = false;
      }
    });

    // Toggle la banque cliquée
    bank.isExpanded = !bank.isExpanded;
  }

  // TrackBy functions pour améliorer les performances
  trackByBankId(index: number, bank: Bank): string {
    return bank.id;
  }

  trackByObjectiveId(index: number, objective: Objective): string {
    return objective.id;
  }

  getTotalBalance(): number {
    return this.banks.reduce((total, bank) => total + bank.balance, 0);
  }

  getObjectiveProgress(objective: Objective): number {
    return Math.round((objective.currentAmount / objective.targetAmount) * 100);
  }

  getBankIconClass(bankId: string): string {
    const iconClasses: { [key: string]: string } = {
      'cih': 'cih-icon',
      'bp': 'bp-icon',
      'cfg': 'cfg-icon'
    };
    return iconClasses[bankId] || 'bp-icon';
  }
}
