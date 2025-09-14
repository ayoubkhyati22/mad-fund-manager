import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';

interface Bank {
  id: string;
  name: string;
  balance: number;
  accountType: string;
  icon: string;
}

interface Objective {
  id: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  bankId: string;
  icon: string;
  iconClass: string;
  progressClass: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {

  bankForm!: FormGroup;
  objectiveForm!: FormGroup;

  // États d'expansion des sections
  sections = {
    addBank: false,
    addObjective: false,
    bankList: false,
    objectiveList: false
  };

  banks: Bank[] = [
    { id: 'cih', name: 'CIH Bank', balance: 182500, accountType: 'Personal Account', icon: 'CIH' },
    { id: 'bp', name: 'Banque Populaire', balance: 4010, accountType: 'Current Account', icon: 'BP' },
    { id: 'cfg', name: 'CFG Bank', balance: 1000, accountType: 'Current Account', icon: 'CFG' }
  ];

  objectives: Objective[] = [];

  // Options pour les types de compte
  accountTypes = [
    'Personal Account',
    'Current Account',
    'Savings Account',
    'Business Account',
    'Investment Account'
  ];

  // Options pour les icônes d'objectifs
  objectiveIcons = [
    { name: 'airplane', label: 'Voyage', iconClass: 'trip', progressClass: 'trip-progress' },
    { name: 'home', label: 'Maison', iconClass: 'house', progressClass: 'house-progress' },
    { name: 'car-sport', label: 'Voiture', iconClass: 'car', progressClass: 'car-progress' },
    { name: 'wallet', label: 'Épargne', iconClass: 'savings', progressClass: 'savings-progress' },
    { name: 'diamond', label: 'Luxe', iconClass: 'jewelry', progressClass: 'jewelry-progress' },
    { name: 'bicycle', label: 'Sport', iconClass: 'bike', progressClass: 'bike-progress' },
    { name: 'trending-up', label: 'Investissement', iconClass: 'tech', progressClass: 'tech-progress' },
    { name: 'school', label: 'Éducation', iconClass: 'education', progressClass: 'education-progress' },
    { name: 'medical', label: 'Santé', iconClass: 'health', progressClass: 'health-progress' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.initializeForms();
  }

  initializeForms() {
    // Formulaire pour ajouter une banque
    this.bankForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      balance: [0, [Validators.required, Validators.min(0)]],
      accountType: ['', Validators.required],
      icon: ['', [Validators.required, Validators.maxLength(5)]]
    });

    // Formulaire pour ajouter un objectif
    this.objectiveForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      currentAmount: [0, [Validators.required, Validators.min(0)]],
      targetAmount: [0, [Validators.required, Validators.min(1)]],
      bankId: ['', Validators.required],
      iconType: ['', Validators.required]
    });
  }

  // Toggle des sections
  toggleSection(section: keyof typeof this.sections) {
    this.sections[section] = !this.sections[section];
  }

  async onSubmitBank() {
    if (this.bankForm.valid) {
      const formData = this.bankForm.value;

      // Créer une nouvelle banque
      const newBank: Bank = {
        id: this.generateId(),
        name: formData.name,
        balance: formData.balance,
        accountType: formData.accountType,
        icon: formData.icon.toUpperCase()
      };

      this.banks.push(newBank);

      // Reset le formulaire
      this.bankForm.reset();

      // Afficher un message de succès
      await this.showToast('Banque ajoutée avec succès!', 'success');
    } else {
      await this.showToast('Veuillez remplir tous les champs requis', 'danger');
    }
  }

  async onSubmitObjective() {
    if (this.objectiveForm.valid) {
      const formData = this.objectiveForm.value;
      const selectedIcon = this.objectiveIcons.find(icon => icon.name === formData.iconType);

      if (!selectedIcon) return;

      // Validation: le montant actuel ne peut pas dépasser le montant cible
      if (formData.currentAmount > formData.targetAmount) {
        await this.showToast('Le montant actuel ne peut pas dépasser le montant cible', 'warning');
        return;
      }

      // Créer un nouvel objectif
      const newObjective: Objective = {
        id: this.generateId(),
        name: formData.name,
        currentAmount: formData.currentAmount,
        targetAmount: formData.targetAmount,
        bankId: formData.bankId,
        icon: selectedIcon.name,
        iconClass: selectedIcon.iconClass,
        progressClass: selectedIcon.progressClass
      };

      this.objectives.push(newObjective);

      // Reset le formulaire
      this.objectiveForm.reset();

      // Afficher un message de succès
      await this.showToast('Objectif ajouté avec succès!', 'success');
    } else {
      await this.showToast('Veuillez remplir tous les champs requis', 'danger');
    }
  }

  async deleteBank(bankId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmer la suppression',
      message: 'Êtes-vous sûr de vouloir supprimer cette banque? Tous les objectifs associés seront également supprimés.',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Supprimer',
          role: 'destructive',
          handler: () => {
            this.banks = this.banks.filter(bank => bank.id !== bankId);
            // Supprimer aussi les objectifs associés
            this.objectives = this.objectives.filter(obj => obj.bankId !== bankId);
            this.showToast('Banque et objectifs associés supprimés', 'warning');
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteObjective(objectiveId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmer la suppression',
      message: 'Êtes-vous sûr de vouloir supprimer cet objectif?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Supprimer',
          role: 'destructive',
          handler: () => {
            this.objectives = this.objectives.filter(obj => obj.id !== objectiveId);
            this.showToast('Objectif supprimé', 'warning');
          }
        }
      ]
    });

    await alert.present();
  }

  getBankName(bankId: string): string {
    const bank = this.banks.find(b => b.id === bankId);
    return bank ? bank.name : 'Banque inconnue';
  }

  getObjectiveProgress(objective: Objective): number {
    return Math.round((objective.currentAmount / objective.targetAmount) * 100);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top'
    });
    toast.present();
  }

  // Getters pour la validation des formulaires
  get bankFormControls() { return this.bankForm.controls; }
  get objectiveFormControls() { return this.objectiveForm.controls; }
}
