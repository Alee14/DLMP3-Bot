/**************************************************************************
 *
 *  DLAP Bot: A Discord bot that plays local audio tracks.
 *  (C) Copyright 2022
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

import { SlashCommandBuilder } from 'discord.js';
import { destroyAudio } from '../backend/Shutdown.js';
import { PermissionFlagsBits } from 'discord-api-types/v10';

export default {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Leaves the voice chat')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    if (!interaction.member.voice.channel) return await interaction.reply({ content: 'You need to be in a voice channel to use this command.', ephemeral: true });
    console.log('Leaving voice channel...');
    await destroyAudio(interaction);
    return await interaction.reply({ content: 'Leaving voice channel', ephemeral: true });
  }
};
