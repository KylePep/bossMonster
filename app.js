// init variable
const heroes = [
  {
    name: 'Slate Slabrock',
    type: 'dwarf',
    damage: 5,
    health: 100,
    maxHealth: 100,
    xp: 0,
    maxXp: 100,
    level: 1,
    id: 'hero1Hp'
  },
  {
    name: 'Flint Ironstag',
    type: 'elf',
    damage: 10,
    health: 50,
    maxHealth: 50,
    xp: 0,
    maxXp: 100,
    level: 1,
    id: 'hero2Hp'
  }
]


const boss = {
  health: 100,
  maxHealth: 100,
  damage: 5,
  level: 1
}

let gold = 0;

let potionPrice = 10

function damageBoss() {
  let comboDmg = 0
  let dmg = heroes.forEach(hero => {
    if (hero.health > 0) {
      comboDmg += hero.damage

    }
  })
  //console.log(comboDmg)
  if (boss.health > 0) {
    if (boss.health >= comboDmg) {
      boss.health -= comboDmg
    } else {
      boss.health -= boss.health
    }
  } else {
    reviveBoss()
  }
  //console.log(boss.health)
  drawBoss()
}

function reviveBoss() {
  // Level up  --- (++)
  // Max health up  --- (+20)
  // damage up (floor(1.5*level)) (++)
  boss.level++
  boss.maxHealth += 20
  boss.health = boss.maxHealth
  boss.damage += (Math.floor(1.5 * boss.level))

  getGold()
  getXP()
}

function getXP() {
  heroes.forEach(person => person.xp += (10 * boss.level))
  drawHero()
}




function getGold() {
  gold += (10 + (boss.level * Math.round(Math.random())))
  drawGold()
}

function drawGold() {
  document.getElementById('gold').innerText = `Party Gold: ${gold}`
}

function drawBoss() {  // redraw boss hp
  // @ts-ignore
  document.getElementById('bossHp').innerText = boss.health
  // @ts-ignore
  document.getElementById('bossDmg').innerText = boss.damage
  document.getElementById('bossMonster').innerHTML = `
  <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="100" aria-valuemin="0"
    aria-valuemax="100">
    <div class="progress-bar bg-danger" style="width: ${(boss.health / boss.maxHealth) * 100}%"></div>
  </div>
  `
}


function buyPotion(hero) {
  // Reduce party gold by $$
  // Increase given hero name by some hp
  // ✅ If statement to check party gold amount - can we afford it?


  if (gold < potionPrice) {
    console.log("Your party is too poor!")
    return
  }

  let name = heroes.find(person => person.name == hero)

  name.health += 5

  gold -= 10

  drawGold()
  drawHero()
}

function levelUp(hero) {

  let name = heroes.find(person => person.name == hero)

  if (name.xp < name.maxXp) {
    console.log("You do not have enough experience. Keep fighting!")
    return
  } else {
    name.level++
    name.maxHealth += 10
    name.health = name.maxHealth
    name.damage += 5
    name.xp = 0
    name.maxXp += 100
  }
  drawHero()
}

function damageAllHeros() {
  heroes.forEach(person => {
    if (person.health <= 0) {
      person.health = 0;
    } else {
      person.health -= boss.damage
    }
  })
  drawHero()

}


let hero1Id [
  hero1Xp,
  hero1MaxXp,
  hero1Level,
  hero1Hp
]
let heroValue [
  xp,
  maxXp,
  level,
  health
]
let hero2Id [
  hero2Xp,
  hero2MaxXp,
  hero2Level,
  hero2Hp
]

function drawHero() {
  // heroes.forEach(hero => {
  //   for (let i = 0; i < 3; i++) {

  //     document.getElementById(`${hero1Id[i]}`).innerText = (`${heroes[0].xp}`)
  //   }
  // })

  // xp
  document.getElementById('hero1Xp').innerText = (`${heroes[0].xp}`)
  document.getElementById('hero2Xp').innerText = (`${heroes[1].xp}`)
  //maxXp
  document.getElementById('hero1MaxXp').innerText = (` / ${heroes[0].maxXp}`)
  document.getElementById('hero2MaxXp').innerText = (` / ${heroes[1].maxXp}`)
  //level
  document.getElementById('hero1Level').innerText = (`${heroes[0].level}`)
  document.getElementById('hero2Level').innerText = (`${heroes[1].level}`)
  //health
  heroes.forEach(person => {
    document.getElementById(person.id).innerText = person.health

  })
}
// function drawHero1Xp() {
//   document.getElementById('hero1Xp').innerText = (`${heroes[0].xp}`)
// }

// function drawHero2Xp() {
//   document.getElementById('hero2Xp').innerText = (`${heroes[1].xp}`)
// }

// function drawHero1MaxXp() {
//   document.getElementById('hero1MaxXp').innerText = (` / ${heroes[0].maxXp}`)
// }

// function drawHero2MaxXp() {
//   document.getElementById('hero2MaxXp').innerText = (` / ${heroes[1].maxXp}`)
// }
// function drawHeroLevel() {
//   document.getElementById('hero1Level').innerText = (`${heroes[0].level}`)
//   document.getElementById('hero2Level').innerText = (`${heroes[1].level}`)
// }

// function drawAllHeroHealth() {
//   heroes.forEach(person => {
//     document.getElementById(person.id).innerText = person.health

//   })
// }


drawHero()
drawBoss()

setInterval(damageAllHeros, 5000)


// ✅ lower hero1's health by the boss's dmg
// ✅ draw hero1's health
// ✅ setInterval for boss dmg

// function damageHero1() {
//   let hero1 = heroes.find(hero => hero.name == 'Slate Slabrock')

//   hero1.health -= boss.damage

//   console.log(hero1.health)

//   drawHero1Health(hero1)
// }


// setInterval(damageHero1, 1000)