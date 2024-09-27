/**************************************************************************
 *
 *  DLAP Bot: A Discord bot that plays local audio tracks.
 *  (C) Copyright 2024
 *  Programmed by Andrew Lee
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 ***************************************************************************/

import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { readdir } from 'node:fs';
import i18next from '../Utilities/i18n.js';
import { files as queuedFiles } from '../AudioBackend/AudioControl.js';

const musicFolder = './music';
const t = i18next.t;
export default {
  data: new SlashCommandBuilder()
    .setName('list')
    .setDescription('Lists the available audio tracks')
    .addIntegerOption(option =>
      option.setName('page')
        .setDescription('Input a number to change the page of the list')
    )
    .addBooleanOption(option =>
      option.setName('queue')
        .setDescription('Lists the audio tracks from the queue')
    ),
  async execute(interaction, bot) {
    const page = interaction.options.getInteger('page') || 1; // If no page is specified, default to page 1
    const queue = interaction.options.getBoolean('queue') !== false; // Check if queue option is true

    const listTracks = (tracks) => {
      const trackList = tracks.map((file, i) => `${i}: ${file}`); // Create an array of track names
      const pageSize = 20; // Number of tracks per page
      const numPages = Math.ceil(trackList.length / pageSize); // Total number of pages
      if (page < 1 || page > numPages) { // Check if the page number is valid
        return interaction.reply({ content: t('invalidPage', { numPages }), ephemeral: true });
      }
      // Split the track list into pages
      const pages = [];
      for (let i = 0; i < numPages; i++) {
        const start = i * pageSize;
        const end = start + pageSize;
        pages.push(trackList.slice(start, end));
      }
      // Send the specified page with the page number and total number of pages
      const listEmbed = new EmbedBuilder();
      listEmbed.setAuthor({ name: t('listTitle', { bot: bot.user.username }), iconURL: bot.user.avatarURL() });
      listEmbed.addFields({ name: t('listTracks', { trackList: trackList.length }), value: `\`\`\`\n${pages[page - 1].join('\n')}\n\`\`\`` });
      listEmbed.setFooter({ text: t('listPage') + ` ${page}/${numPages}` });
      listEmbed.setColor('#0066ff');
      interaction.reply({ embeds: [listEmbed] });
    };

    if (queue) {
      listTracks(queuedFiles);
    } else {
      readdir(musicFolder, (err, files) => {
        if (err) {
          console.error(err);
        } else {
          listTracks(files);
        }
      });
    }
  }
};
