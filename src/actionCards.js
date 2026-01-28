export class ActionCard {
  constructor(type) {
    this.type = type;
  }

  applyEffect(player, game) {
    switch (this.type) {
      case "Freeze":
        console.log(`❄️ ${player.name} est éliminé du tour et perd tous ses points !`);
        player.active = false;
        player.cards = [];
        break;

      case "Flip Three":
        console.log(`🔄 ${player.name} doit piocher 3 cartes supplémentaires !`);
        for (let i = 0; i < 3; i++) {
          const card = game.deck.draw();
          player.addCard(card);
          console.log(`🃏 ${player.name} pioche : ${card}`);
        }
        break;

      case "Second Chance":
        console.log(`✨ ${player.name} reçoit une Seconde Chance !`);
        if (!player.hasSecondChance) {
          console.log(`✨ ${player.name} garde une carte Seconde Chance pour ce tour.`);
          player.hasSecondChance = true;
        } else {
          const other = game.players.find(
            p => p.active && p !== player && !p.hasSecondChance
          );
          if (other) {
            console.log(`✨ ${player.name} donne une carte Seconde Chance à ${other.name}.`);
            other.hasSecondChance = true;
          } else {
            console.log(`🗑️ Seconde Chance défaussée (personne ne peut la recevoir).`);
          }
        }
        break;

      default:
        console.log("Carte Action invalide.");
    }
  }
}