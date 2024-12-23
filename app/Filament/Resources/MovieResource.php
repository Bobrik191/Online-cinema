<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MovieResource\Pages;
use App\Filament\Resources\MovieResource\RelationManagers;
use App\Models\Movie;
use Filament\Actions\DeleteAction;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use League\CommonMark\Node\Inline\Text;

class MovieResource extends Resource
{
    protected static ?string $model = Movie::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('title')->required(),
                Forms\Components\Textarea::make('description')->required(),
                Forms\Components\TextInput::make('popularity')->required()->numeric(),
                Forms\Components\FileUpload::make('poster_path'),
                DatePicker::make('release_date')->required(),
                Forms\Components\TextInput::make('vote_average')->required()->numeric(),
                Forms\Components\TextInput::make('vote_count')->required()->integer(),
                TextInput::make('video_links')->required(),
                Select::make('genres')
                    ->relationship('genres', 'name')
                    ->multiple()
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')->sortable(),
                TextColumn::make('description')->words(10),
                TextColumn::make('popularity')->numeric(1)->sortable(),
                ImageColumn::make('poster_path'),
                TextColumn::make('release_date')->date()->sortable(),
                TextColumn::make('vote_average')->numeric(1)->sortable(),
                TextColumn::make('genres.name'),
            ])
            ->filters([
                Tables\Filters\Filter::make('title')
                    ->form([
                        Forms\Components\TextInput::make('title'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when($data['title'], fn (Builder $query, $search): Builder => $query->whereLike('title', "%{$search}%"));
                    }),
                SelectFilter::make('genres')
                    ->relationship('genres', 'name')
                    ->multiple()
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMovies::route('/'),
            'create' => Pages\CreateMovie::route('/create'),
            'edit' => Pages\EditMovie::route('/{record}/edit'),
        ];
    }
}
