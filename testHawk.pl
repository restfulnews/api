#!/usr/bin/perl
use warnings;
use strict;

print "No args required! Ignoring arguments\n" if @ARGV > 0;

my $companiesFile = "companies.txt";
`echo "" > teamHawk.txt`;

my $j = 0;
for (my $i = 0; $i < 100; $i++) {
    open my $companies, "<", $companiesFile or die "Couldn't open $companiesFile\n";
    foreach my $company (<$companies>) {
        $company =~s/\r//;
        chomp $company;
        `/usr/bin/time --append --output=teamHawk.txt curl -X GET "http://seng.fmap.today/v1/news?start_date=2000-01-01&end_date=2018-01-25&companyids=VAH" >/dev/null 2>/dev/null`;
        $j++;
        print " $j/400\n";
    }
    close $companies;
}

# Collate timing results
my $minSearchTime;
my $maxSearchTime = 0;
open my $searchresults, "<", "teamHawk.txt" or die "Failed to open Search timing results\n";
my $totalSecs = 0;
my $numSearches = 0;
foreach my $line (<$searchresults>) {
    if ($line =~ /user.*system.*elapsed/) {
        $line =~ s/^.*(\d+:\d+\.\d+)elapsed.*$/$1/;
        my $min = $line;
        $min =~ s/(\d+):.+$/$1/;
        $min = $min * 60;
        my $sec = $line;
        $sec =~ s/^.*:(\d+.\d+).*$/$1/;
        $sec = $sec + 0;
        $totalSecs += $min + $sec;
        if (!defined $minSearchTime) {
            $minSearchTime = $sec;
        } elsif ($sec < $minSearchTime) {
            $minSearchTime = $sec;
        }
        if ($sec > $maxSearchTime) {
            $maxSearchTime = $sec;
        }
        $numSearches++;
    }
}
close $searchresults;

`rm teamHawk.txt`;

print "teamHawk Data:\n";
printf  "Average Search time:\n%.2f seconds, $numSearches test cases\n", $totalSecs/$numSearches;
printf  "Max Search time:\n%.2f seconds\n", $maxSearchTime;
printf  "Min Search time:\n%.2f seconds\n", $minSearchTime;
