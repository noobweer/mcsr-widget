<template>
  <div class="settings-preview">
    <div class="settings-preview-header">
      <span class="settings-parametrs-section__text">Preview (example values)</span>

      <!-- Links -->
      <div class="settings-preview-header-links">
        <div class="link-button" @click="copyDiscord">
          <img src="/icons/discord.svg" alt="" />
        </div>
        <a
          class="link-button"
          href="https://github.com/noobweer/mcsr-widget"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/icons/github.svg" alt="" />
        </a>
      </div>
    </div>

    <div class="preview">
      <div class="preview-widgets">
        <!-- Minimized example -->
        <div class="preview-widgets-minimized">
          <MinimizedOverlay
            :elo="exampleData.elo"
            :rankIcon="exampleData.rankIcon"
            :eloChange="exampleData.eloChange"
          />
        </div>

        <!-- Expanded latest match example -->
        <div class="preview-widgets-expanded">
          <PreviewExpandedLatest
            :nickname="exampleData.nickname"
            :elo="exampleData.elo"
            :rank="exampleData.rank"
            :rankIcon="exampleData.rankIcon"
            :badge="selectedBadge"
            :accent="`#${selectedAccent}`"
            :eloChange="exampleData.eloChange"
            :wins="exampleData.wins"
            :loses="exampleData.loses"
            :avg="exampleData.avg"
            :winrate="exampleData.winrate"
            :opponentNickname="exampleData.opponentNickname"
            :opponentElo="exampleData.opponentElo"
            :opponentResult="exampleData.opponentResult"
          />
        </div>

        <!-- Expanded today stats example -->
        <div class="preview-widgets-expanded-extra">
          <PreviewExpandedToday
            :nickname="exampleData.nickname"
            :elo="exampleData.elo"
            :rank="exampleData.rank"
            :rankIcon="exampleData.rankIcon"
            :winrate="exampleData.winrate"
            :badge="selectedBadge"
            :accent="`#${selectedAccent}`"
            :eloChange="exampleData.eloChange"
            :wins="exampleData.wins"
            :loses="exampleData.loses"
            :avg="exampleData.avg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-preview-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
}
.settings-preview-header-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
.settings-preview {
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 0.5rem;
  background:
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(/src/assets/icons/back.jpg) 50% / cover no-repeat;
}
.preview {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex: 1 0 0;
  align-self: stretch;
}
.preview-widgets {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.preview-widgets-minimized {
  display: flex;
  overflow: hidden;
  gap: 1rem;
  border-radius: 2rem;
  background: #000;
  height: 48px;
  width: 236px;
  padding: 0.5rem 1rem;
}
.preview-widgets-expanded {
  display: flex;
  overflow: hidden;
  gap: 1rem;
  border-radius: 2rem;
  background: #000;
  height: 164px;
  width: 290px;
  padding: 1rem 1.5rem;
}
.preview-widgets-expanded-extra {
  display: flex;
  overflow: hidden;
  gap: 1rem;
  border-radius: 2rem;
  background: #000;
  height: 196px;
  width: 290px;
  padding: 1rem 1.5rem;
}
</style>
