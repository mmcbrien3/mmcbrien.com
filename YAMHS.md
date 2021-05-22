---
layout: default
---

# Yet Another Monty Hall Simulation 

The Monty Hall Problem is a popular statistical puzzle because it is easy to explain and is so counterintuitive. The solution I thought of when I first heard this problem shouted out loudly as the only possibility. The answer seemed so obvious, yet I was so wrong. And this is clearly the case for many people as it has spurred many a youtube video and internet article.

## Background
The Monty Hall Problem has to do with the game show Let's Make a Deal. During the show, the host, the titular Monty Hall, presents the contestants with 3 doors. Behind 2 of the doors is a goat and behind 1 door is a car. The contestant's goal is to select the door that hides the car, but there is a bit of a twist.

First, the contestant selects one of the doors. Next, Monty Hall opens up one of the two unselected doors. Monty will always open up a door with a goat behind it. If the contestant has already selected a door with a goat, Monty Hall is forced to open the only other door with a goat. If the contestant has initially selected the door with the car behind it, Monty will randomly select one of the other doors (both with goats) to open.

At this point, the contestant is given another choice: they can either stay with their current door or they can switch to the other unopened door.

So here's the question: what is the best strategy to employ at this point? Should you always stay or should you always switch? Or does it not matter? Is this really a non-choice presented by an old game show to throw in a bit of excitement?

## Intuition
For me, and I'm guessing for many others, when I first heard this problem, it seemed like a non-choice - it doesn't matter what the contestant does. When Monty Hall opens the door and leaves two closed doors, the game has changed to a coin toss, 50-50 chance. My brain tells me to ignore the lingo of "stay" and "switch". Those are just meant to confuse you! What you really have are 2 doors. One has a goat and one has a car, good luck.

But this isn't correct. It is not a 50-50 chance of winning a car. If you employ the best strategy, your chances actually increase to 2/3 chance! How can this be? How can what seems to be a coin toss actually be heavily weighted towards one side? I think the answer to why our intuition is wrong will be more easily answered if we first figure out the correct solution.

## Simplify
Let's imagine the game is slightly different. Just like before, you select a door first and then Monty Hall reveals a goat from behind one of the other doors. However, in this game, you have no choice but to stay. Monty Hall reveals what's behind the other two doors slowly in succession but will always open a goat door first. He's making it an agonizing reveal for you and the audience. Well this painful display by the host would be no different than if he just immediately showed you what was behind your door (minus some fanfare). What would your odds be in this case? It's trivial: 1/3. In this game, you are simply randomly selecting from 3 doors and you have absolutely no outside knowledge.

This is obvious to us. What's not as obvious is that this version of the game lies within the original version. If you went into this game and knew that you were going to stay with your door no matter what, you would actually be playing this modified version of the game. You select a door; Monty reveals a door; you stubbornly stay with that lucky first door; you win 1/3 of the time.

Well, wait a second, here is some insight. If this was really a 50-50 chance, how could one of the options, namely staying with your door, give you only a 33% chance of winning?

## The Best Strategy
Switching, as opposed to staying, is the only other strategy you could choose. Since we all know that probabilities must add up to 100%, we can conclude that this switching strategy will win you a brand new car 67% of the time. Wow!

Ok, so by process of elimination we have determined the best strategy, but perhaps this leaves something to be desired. Why does switching give you such good odds. Let's look at it another way. Starting at the beginning again, you select a door from the 3. You have a 1/3 chance of having selected the car. Put another way, this means that you have a 2/3 chance of having not selected the car. Put another another way, there is a 2/3 chance of the car being behind one of the remaining, unselected doors.

Now, Monty opens one of the doors. What has changed? Have your odds of having selected the door with the car magically jumped to 50%? No. Monty will always, always, always select a door with a goat so your original selection is doing no better. However, we still know that there was a 2/3 chance of the car being behind one of the 2 doors you didn't select. Since Monty has opened one of the doors and we have learned that the car isn't behind that door, we now know that if the car isn't behind one of the doors you selected (2/3 chance) then there is a 100% chance it is behind this final door. 2/3 * 1/1 = 2/3.

## Why was I so wrong?
At this point in my understanding, one question remained, why did I get this wrong? Perhaps a more insightful question to ask would be, what essential part of this problem did I overlook? This can be answered by creating a game in which my initial intuition was correct; that is, a game in which the strategy does not matter.

Let's alter the original *Let's Make a Deal* game. In our new game, we'll replace the reliable Monty Hall with a new host, Dory. Dory is an entertaining host, but she has one problem: she can't remember which door contains the car. When it comes time to reveal one of the doors, she knows that she shouldn't reveal what's behind the door you've selected, but she's at a loss as to which remaining door to open. Therefore, she reveals one of the doors at random. That means, that 1/3 of the time, she reveals the door that has the car behind it! In these situations, you happily switch to the door that has been revealed to contain the prize and you go home in a new car.

However, the remaining 2/3 of the time, you are in a similar situation as to before: you can stay with your door, switch to the other unrevealed door, or you can randomly select between the two. Now, with our new host, which strategy is best?

Now we have come to the dilemma that I thought was originally being presented. There is no best strategy. No matter which strategy you employ, this choice is 50-50. That means, in this new game, 1/3 of the time (when Dory reveals the car) you win instantly and the remaining 2/3 of the time you have a 1/2 chance of winning. Therefore, you get a `1/3 * 1/1 + 2/3 * 1/2 = 2/3` chance of winning overall. But the overall win probability is not what is truly notable. What we should note here is that, in the case in which Dory randomly picks a goat door, we have reached the same stage of the game as with Monty Hall; namely, we need to stay or switch our door. However, with Dory as the host, we have only a 50% chance of selecting correctly, but with Monty, we can achieve a 66% chance of winning. Why?

The answer is that randomness contains no information. With Dory as the host, when we must stay or switch on our door, the statistical scenario is exactly the same as having to randomly select from two doors with no previous information. All of the fanfare that came before with Dory as the host is meaningless noise. We have nothing to learn from her random choices. With Monty as the host, the situation is different. The preamble to the final decision is not meaningless. When Monty is the host and we initially select a door with a goat behind it, which would happen 2/3 of the time, Monty's actions are predefined by the rules of the game. The fact that Monty was constrained in his decision (i.e. that he did not decide the door at random), means there is something for us to learn about our odds. Ultimately, what matters when trying to make such a decision is understanding all of the actions of the other agents in the game. Dory is a black hole of randomness; no knowledge can be extracted from it. Monty cannot always hide information in the same way. The algorithm that is Monty's behavior is open to our analysis.

## Appendix

### A Note on the Host's Algorithm
An interesting question that can arise when analyzing this game may be how the host determines which door to open, the host algorithm. Let's suppose that the host wants to limit your chances of winning the car. What algorithm should the host employ to minimize your chances? The only condition is that the host must communicate the algorithm she will use before the game begins. As we've already discussed above, Monty Hall and Dory's algorithm both result in a 2/3 chance of the contestant winning if they employ the optimal strategy.

What if the host employs simply full randomness. The host will reveal any door at random. The host gives no regard for which door contains the car nor which door the contestant has selected. But this fully random host falls prey to the same issues as Dory. 1/3 of the time this host will reveal the car and the remaining time the contestant will still get a 50-50 chance of selecting the door, ultimately resulting in a 2/3 win rate (it may be worth noting that the stay strategy is the worst strategy in this case.). Similarly, if the host always reveals the door that the contestant has initially selected, the contestant will win 2/3 of the time because the host is 1/3 of the time revealing the car.

Let's try to be more maniacal. Let's say the host will reveal the contestant's selected door if they have selected a goat but a different door randomly if they have selected a car. This sounds promising but the information that has been revealed by the selection gives the contestant an edge. If the contestant employs the stay strategy, they will win 2/3 of the time again. If the host reveals a door that the contestant didn't select, then the contestant knows the selected door will always win. If the selected door is revealed, then the contestant has a 50-50 chance, but this still gives them an overall 2/3 chance of winning.

It seems hopeless at this point for the producers of the show. Maybe by combining randomness with our final algorithm we can achieve something better. Let's define our new strategy as:
- If the contestant has selected the car, randomly pick from the other two doors which to reveal
- If the contestant has selected a goat:
  - 50% of the time, reveal the door the contestant has selected
  - 50% of the time, reveal the unselected door with the goat

In this algorithm, the contestant never gets a free win by having the car revealed to them and the minimal amount of information is passed onto them because their is randomness in the selection process. Let's consider the scenarios. After selecting the initial door, the host then reveals the selected door (and a goat) to the contestant. What is the best strategy at this point? Well, the contestant has learned nothing about the other two doors still, so they have a 50-50 chance of winning. If a different, unselected door (and a goat) is revealed to the contestant, they must reason about which of the situations they are in: have they selected the car door and now the host has randomly decided between the two remaining door OR have they selected a goat door and the host has then randomly decided to open a different door anyways? They should employ a strategy based upon the probabilities of it being each scenario, but here the contestant fails. There is a 1/3 chance that they chose the car originally, and in such a case, the host would be obligated to choose a different door. However, there is still a `2/3 * 1/2 = 1/3` chance that they selected a goat originally and the host has randomly decided to open another goat door anyways. The contestant is in a bind: both scenarios are equally likely. Therefore, the contestant faces another 50-50 choice, to stay or to switch. If the host uses this algorithm, the best the contestant can do is win 1/2 the time.

Why the show did not use this strategy is not known to me. Maybe they didn't think of it or maybe they thought it would have been too complicated for a fun game show. Either way, if they had used this strategy, they would have given away fewer cars.

### Looking at the math
While writing up this article, I simulated all of the contestant and host strategies. One variable that I found fun to play around with was the number of doors (`n`) that the game contained. Typically, the game was played with 3 doors and a single one being revealed by Monty Hall, but what if the game started with 50 doors and a single one was revealed. Thinking about it this way can give a different perspective on the original paradox. We can define the probabilities of winning with each strategy when playing with `n` doors.

- Random Strategy:
  - After a single door is revealed, there will be `n-1` doors to select from. Since the selection is uniformly random, the contestant's chances are `1/(n-1)`
- Stay Strategy:
  - After a single door is revealed, the contestant sticks with the original choice and the original odds: `1/n`
- Switch Strategy:
  - For this strategy, we have to consider different probabilities. If the contestant didn't select the car (`n-1/n` chance of this), then the likelihood of winning is `1/n-2` (`n-2` in this case because the contestant knows the car isn't behind the selected door or the revealed door.). If the contestant did select the car (`1/n` chance of this), then they have no chance of winning. This results in the ultimate odds of (`1/n * 0 + (n-1)/n * 1/(n-2) = (n-1)/(n*(n-2)`. If we plug in 3 for `n` like in the normal variation of the game, we can see the odds work out to what we calculated above: `(3-1)/(3*(3-2) = 2/(3*1) = 2/3`.

![](./assets/monty_hall_graph.png)
**Figure 1.** This chart shows the probability of winning against Monty Hall when employing the three strategies discussed with a variable amount of doors. The upper plot shows the theoretical effectiveness, and the lower plot shows the empirical effectiveness after simulating the game 1,000,000 times with each strategy and each number of doors.
### Code
[REPO](https://github.com/mmcbrien3/MontyHallJava)
